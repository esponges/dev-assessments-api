import { IsString, IsNotEmpty } from 'class-validator';

export class CandidateDetailsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
