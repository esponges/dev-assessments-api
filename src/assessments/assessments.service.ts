import { Injectable } from '@nestjs/common';
import { LangchainService } from 'src/langchain/langchain.service';

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
          question_difficulty: { type: 'string' },
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

  async createAssessment() {
    const promptMessages = [
      'human',
      'An assessment with 10 questions for a software developer with the following topics and level: {description}',
    ];
    const prompt = this.langchain.generatePrompt(promptMessages);
    const runnable = this.langchain.getRunnable(this.schema, prompt);

    const response = await runnable.invoke({
      description:
        // "My name's John Doe and I'm 30 years old. My favorite kind of food are chocolate chip cookies.",
        'Full stack golang (backend) and React (front end) for a web application with 7 years of experience.',
    });
    return response;
  }
}
