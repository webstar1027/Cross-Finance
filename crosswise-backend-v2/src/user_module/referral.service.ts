import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schema/profile.schema';
import {
  CROSSWISE_REFERRAL_ADDRESS,
  HTTP_RPC_URL,
  ZERO_ADDRESS,
} from 'src/helpers/constants';
import { randomUUID } from 'crypto';
import { Cron } from '@nestjs/schedule';
import * as ABI_REFERRAL from 'src/helpers/abis/crosswise/ABI_REFERRAL.json';
import web3 from 'src/helpers/web3-utils';

@Injectable()
export class ReferralService {
  private locked = false;
  private web3 = web3;
  private referralContract = new this.web3.eth.Contract(
    ABI_REFERRAL as any,
    CROSSWISE_REFERRAL_ADDRESS,
  );
  private readonly logger = new Logger(ReferralService.name);
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async testFunction() {}

  @Cron('50 * * * * *')
  async updateCollections() {
    if (this.locked) return;
    try {
      this.locked = true;
      this.logger.verbose(`updateCollections ${new Date().toLocaleString()}`);
      const cachedReferrers = await this.profileModel
        .find({
          refOnchained: false,
          referrer: {
            $ne: ZERO_ADDRESS,
          },
        })
        .sort({ createdAt: 1 })
        .limit(50)
        .lean()
        .select({
          // _id: 0,
          address: 1,
          referrer: 1,
        })
        .exec();
      const cachedIds: string[] = cachedReferrers.map((item) =>
        item._id.toString(),
      );
      // return;
      if (cachedReferrers.length === 0) {
        this.logger.verbose(
          `updateCollections --- No cached referrers---${new Date().toLocaleString()}`,
        );
        return;
      }
      // console.log(cachedReferrers);
      const account = this.web3.eth.accounts.privateKeyToAccount(
        process.env.PRIVATE_KEY,
      );

      const formedData =
        this.referralContract.methods.bulkRecordReferralFromOffchain(
          cachedReferrers.map((item) => ({
            user: item.address,
            referrer: item.referrer,
          })),
        );

      const options = {
        to: formedData._parent._address,
        data: formedData.encodeABI(),
        gas: await formedData.estimateGas({ from: account.address }),
      };

      const signed = await this.web3.eth.accounts.signTransaction(
        options,
        account.privateKey,
      );
      const receipt = await this.web3.eth.sendSignedTransaction(
        signed.rawTransaction,
      );
      // console.log(receipt);

      await this.profileModel.updateMany(
        {
          _id: { $in: cachedIds },
        },
        { refOnchained: true },
      );
      this.locked = false;

      this.logger.verbose(
        `updateCollections --- Updated ${
          cachedReferrers.length
        } refers at txHash ${
          receipt.transactionHash
        } ---${new Date().toLocaleString()}`,
      );
      return receipt.transactionHash;
    } catch (error) {
      this.locked = false;
      this.logger.error(error);
    }
  }
}
