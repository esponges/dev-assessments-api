import { IsNotEmpty } from 'class-validator';

export class EvaluateAssessmentDto {
  @IsNotEmpty()
  // in the future both assessment and response ids
  // will be used to be retrieved from the database
  // assessmentId: string;
  // questionId: string;
  challenge: string;
  response: string;
  promptOpt: number;
}
