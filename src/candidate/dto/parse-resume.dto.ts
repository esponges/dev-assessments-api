import { IsString, IsIn } from 'class-validator';

export class ParseResumeDto {
  @IsIn(['true', 'false'])
  @IsString()
  upsert: string;

  @IsString()
  userId: string;
}
