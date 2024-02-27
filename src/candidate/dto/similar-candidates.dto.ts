import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SimilarCandidatesDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  metadata: string[];
}
