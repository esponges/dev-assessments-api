export const evaluateAssessmentSchema = {
  name: 'evaluate_questions',
  description:
    'Evaluates the developer response to the assessment questions and returns a score and feedback message.',
  type: 'object',
  properties: {
    questionsEvaluation: {
      type: 'array',
      description: 'An array of questions with their evaluation',
      items: {
        type: 'object',
        properties: {
          question_id: {
            type: 'string',
            description: 'The id of the question',
          },
          score: {
            type: 'number',
            description: 'The score of the response',
          },
          feedback_message: {
            type: 'string',
            description: 'A feedback message to the developer.',
          },
        },
        required: ['question_id', 'score', 'feedback_message'],
      },
    },
  },
};

export type EvaluateAssessmentResponse = {
  questionsEvaluation: {
    question_id: string;
    score: number;
    feedback_message: string;
  }[];
};

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
          question_topic: {
            type: 'string',
            description:
              'The topic of the question (e.g. "React", "Nodejs", "Python")',
          },
          difficulty: { type: 'string', enum: ['EASY', 'MEDIUM', 'HARD'] },
          choices: { type: 'array', items: { type: 'string' } },
          correct_answer: { type: 'string' },
          stack: { type: 'string' },
        },
        required: ['question_text', 'choices', 'difficulty', 'correct_answer'],
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
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  }[];
};
