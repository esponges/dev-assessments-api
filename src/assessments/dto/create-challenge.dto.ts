import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty()
  experience: string;

  @IsNotEmpty()
  @IsString()
  tech: string;
}
