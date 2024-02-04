import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetQuestionsDto {
  @IsNotEmpty()
  query: string;

  @IsNotEmpty()
  namespace: string;

  @IsOptional()
  k: number;

  @IsOptional()
  // todo: improve type
  filter: Record<string, any>;
}
