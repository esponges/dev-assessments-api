import { IsNotEmpty } from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty()
  experience: string;
}
