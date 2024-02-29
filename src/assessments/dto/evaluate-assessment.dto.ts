import { IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// this might have to be moved to a separate file
class Question {
  id: string;
  answer: string;
  selectedAnswer: string;
}

export class EvaluateAssessmentDto {
  @IsNotEmpty()
  // in the future both assessment and response ids
  // will be used to be retrieved from the database
  // questionId: string;
  // will accept an array of Question objects
  @IsArray()
  @Type(() => Question)
  questions: Question[];
}
