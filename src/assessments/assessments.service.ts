import { Injectable } from '@nestjs/common';
import { LangchainService } from 'src/langchain/langchain.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { getAssessmentPrompt } from './prompts/assessment';
import { displayQuizSchema } from './structured-schema.ts/structured-quiz-schema';

@Injectable()
export class AssessmentsService {
  private readonly schema = displayQuizSchema;
  constructor(private readonly langchain: LangchainService) {}

  getAssessments(): string {
    return 'This will return all assessments';
  }

  async createAssessment(details: CreateAssessmentDto) {
    const prompts = getAssessmentPrompt(details, details.prompt);
    const prompt = this.langchain.generatePrompt(prompts.promptMessages);
    const runnable = this.langchain.getRunnable(this.schema, prompt);

    const response = await runnable.invoke({
      description: prompts.description,
    });
    return response;
  }
}
