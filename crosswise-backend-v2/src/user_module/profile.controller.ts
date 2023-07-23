import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }
  @Get('test')
  async testFunc() {
    return await this.service.testFunction();
  }

  @Get(':address')
  async getProfile(@Param('address') address: string) {
    return await this.service.getProfileByAddress(address.toLowerCase());
  }

  @Post(':address')
  async updateProfile(
    @Param('address') address: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.service.updateProfile(
      address.toLowerCase(),
      updateProfileDto,
    );
  }

  @Get('referral_code/:address')
  async getReferralCode(@Param('address') address: string) {
    return await this.service.getReferralCode(address);
  }

  @Post('set_referrer/:refCode/:address')
  async setReferrer(
    @Param('refCode') refCode: string,
    @Param('address') address: string,
  ) {
    return await this.service.setReferrer(refCode, address.toLowerCase());
  }

  @Get('referred_users/:address/:currentPage')
  async getReferredUsers(
    @Param('address') address: string,
    @Param('currentPage') currentPage: number,
  ) {
    return await this.service.getReferredUsers(
      address.toLocaleLowerCase(),
      currentPage,
    );
  }

  @Get('nonce/:address')
  async getNonce(@Param('address') address: string) {
    const profile = await this.service.getProfileByAddress(
      address.toLowerCase(),
    );
    return profile.refCode;
  }
}
