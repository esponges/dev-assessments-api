import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ParseResumeDto {
  @IsString()
  @IsOptional()
  resume: string;

  @IsBoolean()
  @IsOptional()
  upsert: boolean;
}
