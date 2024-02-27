// dto for assessments
// will receive the data from the client this way:

// {
//   "stack": ["node", "express", "go", "python"],
//   "level": "junior",
//   "number_of_questions": 10
//   "duration": "30 minutes"
// }
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssessmentDto {
  @IsNotEmpty()
  stack: {
    tech: string;
    experience: number;
  }[];

  @IsNotEmpty()
  promptOpt: number;

  @IsNumber()
  @IsNotEmpty()
  number_of_questions: number;

  @IsString()
  @IsOptional()
  level: string;

  @IsNumber()
  @IsOptional()
  duration: number;
}
