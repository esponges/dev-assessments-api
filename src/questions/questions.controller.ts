import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('questions')
export class QuestionsController {
  constructor() {}

  @Get()
  getQuestions(): string {
    return 'This will return all questions';
  }
}
