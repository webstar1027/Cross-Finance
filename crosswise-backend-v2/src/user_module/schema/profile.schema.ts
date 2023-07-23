import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document, Types } from 'mongoose';
import { ZERO_ADDRESS } from 'src/helpers/constants';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, unique: true, index: true })
  address: string;

  @Prop({ unique: true, sparse: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ unique: true, sparse: true })
  telegram: string;

  @Prop({ unique: true, sparse: true })
  discord: string;

  @Prop({ type: Object })
  notification: {
    email: boolean;
    telegram: boolean;
    discord: boolean;
  };

  @Prop({ default: ZERO_ADDRESS })
  referrer: string;

  @Prop({})
  wasReferredAt: Date;

  @Prop({ default: 0 })
  referredCount: number;

  @Prop({ unique: true })
  refCode: string;

  @Prop({ default: false })
  refOnchained: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
