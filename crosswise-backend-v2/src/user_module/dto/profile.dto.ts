export class BaseProfileDto {
  name: string;
  email: string;
  telegram: string;
  discord: string;
  notification: {
    email: boolean;
    telegram: boolean;
    discord: boolean;
  };
}

export class UpdateProfileDto extends BaseProfileDto {
  signatureHash: string;
}
