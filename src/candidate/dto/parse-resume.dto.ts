import { IsOptional } from 'class-validator';

export class ParseResumeDto {
  @IsOptional()
  resume: string;
  upsert: boolean;
}
