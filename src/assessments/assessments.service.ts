import { Injectable } from '@nestjs/common';
import { LangchainService } from 'src/langchain/langchain.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { getAssessmentPrompt } from './prompts/assessment';

// follow above example to create a schema for the display_quiz
const jsonSchema = {
  name: 'display_quiz',
  description:
    "Displays a quiz to the student with multiple choice and free response questions. The student's responses are then returned.",
  type: 'object',
  properties: {
    title: { type: 'string' },
    questions: {
      type: 'array',
      description:
        'An array of questions with a mix of multiple choice and free response questions.',
      items: {
        type: 'object',
        properties: {
          question_text: { type: 'string' },
          question_type: {
            type: 'string',
            enum: ['MULTIPLE_CHOICE', 'FREE_RESPONSE'],
          },
          question_topic: { type: 'string' },
          choices: { type: 'array', items: { type: 'string' } },
          correct_answer: { type: 'string' },
        },
        required: ['question_text'],
      },
    },
  },
};

@Injectable()
export class AssessmentsService {
  private readonly schema = jsonSchema;
  constructor(private readonly langchain: LangchainService) {}

  getAssessments(): string {
    return 'This will return all assessments';
  }

  async createAssessment(details: CreateAssessmentDto) {
    const prompts = getAssessmentPrompt(details, 1);
    const prompt = this.langchain.generatePrompt(prompts.promptMessages);
    const runnable = this.langchain.getRunnable(this.schema, prompt);

    const response = await runnable.invoke({
      description: prompts.description,
    });
    return response;
  }
}
