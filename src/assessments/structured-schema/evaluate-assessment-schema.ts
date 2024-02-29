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
