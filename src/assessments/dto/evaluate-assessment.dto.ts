import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EvaluateAssessmentDto {
  @IsString()
  @IsNotEmpty()
  // in the future both assessment and response ids
  // will be used to be retrieved from the database
  // assessmentId: string;
  // questionId: string;
  challenge: string;

  @IsString()
  @IsNotEmpty()
  devResponse: string;

  @IsNotEmpty()
  @IsNumber()
  promptOpt: number;
}
