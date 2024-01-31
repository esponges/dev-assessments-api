import { Injectable } from '@nestjs/common';
import { LangchainService } from 'src/langchain/langchain.service';

const jsonSchema = {
  title: 'Person',
  description: 'Identifying information about a person.',
  type: 'object',
  properties: {
    name: { title: 'Name', description: "The person's name", type: 'string' },
    age: { title: 'Age', description: "The person's age", type: 'integer' },
    fav_food: {
      title: 'Fav Food',
      description: "The person's favorite food",
      type: 'string',
    },
    nationality: {
      title: 'Nationality',
      description: "Will be inferred from the person's name",
      type: 'string',
    },
  },
  required: ['name', 'age', 'fav_food', 'nationality'],
};

@Injectable()
export class AssessmentsService {
  private readonly schema = jsonSchema;
  constructor(private readonly langchain: LangchainService) {}

  getAssessments(): string {
    return 'This will return all assessments';
  }

  async createAssessment() {
    const promptMessages = ['human', 'Human description: {description}'];
    const prompt = this.langchain.generatePrompt(promptMessages);
    const runnable = this.langchain.getRunnable(this.schema, prompt);

    const response = await runnable.invoke({
      description:
        // "My name's John Doe and I'm 30 years old. My favorite kind of food are chocolate chip cookies.",
        'Me llamo Juan Perez y tengo 30 años. Me encanta la cerveza y los Takis.',
    });
    return response;
  }
}
