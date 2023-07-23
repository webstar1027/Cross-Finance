import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProfileDto } from './dto/profile.dto';
import { Profile, ProfileDocument } from './schema/profile.schema';
import IWeb3 from 'web3';
import { HTTP_RPC_URL, ZERO_ADDRESS } from 'src/helpers/constants';
import { randomUUID } from 'crypto';
@Injectable()
export class ProfileService {
  private web3: IWeb3;
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {
    const Web3 = require('web3');
    this.web3 = new Web3(new Web3.providers.HttpProvider(HTTP_RPC_URL));
  }

  async testFunction() {}

  async updateProfile(address: string, updateProfile: UpdateProfileDto) {
    const profile = await this.getProfileByAddress(address);
    if (
      !this.verifySignatureHash(
        profile.refCode,
        profile.address,
        updateProfile.signatureHash,
      )
    ) {
      throw new HttpException('Invalid Signature', HttpStatus.BAD_REQUEST);
    }
    profile.name = updateProfile.name;
    profile.email = updateProfile.email;
    profile.telegram = updateProfile.telegram;
    profile.discord = updateProfile.discord;
    profile.notification = updateProfile.notification;
    await profile.save();
    return profile;
  }

  async getProfileByAddress(address: string) {
    try {
      this.verifyChecksumAddress(address);
      const profile = await this.profileModel
        .findOne({ address: address.toLowerCase() })
        .exec();
      if (profile) return profile;
      return await this.profileModel.create({
        address: address.toLowerCase(),
        refCode: randomUUID().replaceAll('-', '').slice(0, 14),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Profile[]> {
    const all = await this.profileModel.find().lean().exec();
    return all;
  }

  async getReferralCode(address: string): Promise<any> {
    const profile = await this.getProfileByAddress(address);
    return {
      referredCount: profile.referredCount,
      referrer: profile.referrer,
      refCode: profile.refCode,
    };
  }

  async setReferrer(refCode: string, address: string): Promise<any> {
    const [profile, referrer] = await Promise.all([
      this.getProfileByAddress(address),
      this.profileModel.findOne({ refCode }).exec(),
    ]);

    if (!referrer || !profile)
      throw new HttpException('Invalid Referral Code', HttpStatus.BAD_REQUEST);

    if (referrer.address === profile.address)
      throw new HttpException(
        `Can't use your own referral code`,
        HttpStatus.BAD_REQUEST,
      );
    if (profile.referrer === ZERO_ADDRESS) {
      referrer.referredCount++;
      profile.referrer = referrer.address;
      profile.wasReferredAt = new Date();
      profile.save();
      referrer.save();
    }
    return {
      referredCount: profile.referredCount,
      referrer: profile.referrer,
      refCode: profile.refCode,
    };
  }

  async getReferredUsers(address: string, curPage: number) {
    const result = await this.profileModel
      .find({ referrer: address })
      .lean()
      .select({
        address: 1,
        wasReferredAt: 1,
      })
      .sort({
        wasReferredAt: -1,
      })
      .skip(curPage * 10)
      .limit(10)
      .exec();
    return result.map((user) => user.address);
  }

  verifyChecksumAddress(address: string) {
    return this.web3.utils.toChecksumAddress(address);
  }

  verifySignatureHash(
    data: string,
    owner: string,
    signatureHash: string,
  ): boolean {
    try {
      const recovered = this.web3.eth.accounts.recover(data, signatureHash);
      return owner.toLowerCase() === recovered.toLowerCase();
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  recoverSignatureHash(data: string, signatureHash: string): string {
    try {
      const recovered = this.web3.eth.accounts.recover(data, signatureHash);
      return recovered.toLowerCase();
    } catch (error) {
      return '';
    }
  }
}
