import { Injectable } from '@nestjs/common';

import { LangchainService } from 'src/langchain/langchain.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { getAssessmentPrompt, getEvaluateAssessmentPrompt } from './prompts';
import { displayQuizSchema } from './structured-schema/structured-quiz-schema';
import { evaluateAssessmentSchema } from './structured-schema/evaluate-assessment-schema';
import { EvaluateAssessmentDto } from './dto/evaluate-assessment.dto';

@Injectable()
export class AssessmentsService {
  private readonly createAssessmentSchema = displayQuizSchema;
  private readonly evaluateAssessmentSchema = evaluateAssessmentSchema;
  constructor(private readonly langchain: LangchainService) {}

  getAssessments(): string {
    return 'This will return all assessments';
  }

  async createAssessment(details: CreateAssessmentDto) {
    const prompts = getAssessmentPrompt(details, details.promptOpt);
    const prompt = this.langchain.generatePrompt(prompts.promptMessages);
    const runnable = this.langchain.getRunnable(
      this.createAssessmentSchema,
      prompt,
    );

    const response = await runnable.invoke({
      description: prompts.description,
    });
    return response;
  }

  // todo: create reusable function for this
  // it would accept a prompt and a schema
  async evaluateAssessment(details: EvaluateAssessmentDto) {
    const prompts = getEvaluateAssessmentPrompt(details);
    const prompt = this.langchain.generatePrompt(prompts.promptMessages);
    const runnable = this.langchain.getRunnable(
      this.evaluateAssessmentSchema,
      prompt,
    );

    const response = await runnable.invoke({
      description: prompts.description,
    });
    return response;
  }
}
