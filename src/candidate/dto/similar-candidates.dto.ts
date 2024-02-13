import { IsNotEmpty, IsOptional } from 'class-validator';

export class SimilarCandidatesDto {
  @IsNotEmpty()
  description: string;

  @IsOptional()
  metadata: string[];
}
