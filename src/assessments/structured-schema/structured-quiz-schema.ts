export const createAssessmentSchema = {
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

export type CreateAssessmentResponse = {
  title?: string;
  questions: {
    question_text: string;
    question_type: 'MULTIPLE_CHOICE' | 'FREE_RESPONSE';
    question_topic: string;
    choices?: string[];
    correct_answer: string;
  }[];
};
