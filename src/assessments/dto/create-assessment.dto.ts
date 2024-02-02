// dto for assessments
// will receive the data from the client this way:

// {
//   "stack": ["node", "express", "go", "python"],
//   "level": "junior",
//   "number_of_questions": 10
//   "duration": "30 minutes"
// }
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAssessmentDto {
  @IsNotEmpty()
  stack: string[];

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  number_of_questions: number;

  @IsOptional()
  duration: string;

  @IsOptional()
  prompt: number;
}
