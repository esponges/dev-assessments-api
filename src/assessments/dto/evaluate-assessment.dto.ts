import { IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { AssessmentQuestion } from 'src/models';

export class EvaluateAssessmentDto {
  @IsNotEmpty()
  // in the future both assessment and response ids
  // will be used to be retrieved from the database
  // questionId: string;
  // will accept an array of Question objects
  @IsArray()
  @Type(() => AssessmentQuestion)
  questions: AssessmentQuestion[];
}
