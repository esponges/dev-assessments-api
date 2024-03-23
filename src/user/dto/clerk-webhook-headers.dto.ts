import { IsNotEmpty, IsString } from 'class-validator';

export class ClerkWebhookHeadersDto {
  @IsNotEmpty()
  @IsString()
  'svix-id': string;

  @IsNotEmpty()
  @IsString()
  'svix-timestamp': string;

  @IsNotEmpty()
  @IsString()
  'svix-signature': string;
}
