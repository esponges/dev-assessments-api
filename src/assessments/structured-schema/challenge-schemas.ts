// evaluate assessment schema
// this schema is used to evaluate the developer's response to the assessment
// the assessment is a challenge that the developer has to solve
// this challenge is usually a coding challenge (not algorithmic but a real-world problem)
// with his knowledge of the language and the framework he is using
// the developer's response is evaluated by the LLM model
// the model will evaluate the response and return a score in the following format:
// code quality, code correctness, code efficiency, code maintainability
// the model will also return a feedback message to the developer
// the feedback message will be used to provide the developer with feedback on his response
export const evaluateChallengeSchema = {
  name: 'evaluate_assessment',
  description:
    'Evaluates the developer response to the assessment and returns a score and feedback message.',
  type: 'object',
  properties: {
    code_quality: {
      type: 'number',
      description:
        'Does the code follow best practices, is it clean and readable? etc',
    },
    code_correctness: {
      type: 'number',
      description: 'Does the code solve the problem correctly?',
    },
    code_efficiency: {
      type: 'number',
      description: 'Is the code efficient and optimized?',
    },
    code_maintainability: {
      type: 'number',
      description: 'Is the code maintainable and scalable?',
    },
    feedback_message: {
      type: 'string',
      description: 'A feedback message to the developer.',
    },
  },
  required: [
    'code_quality',
    'code_correctness',
    'code_efficiency',
    'code_maintainability',
    'feedback_message',
  ],
};

// todo: use it...
export type EvaluateChallengeLLMResponse = {
  code_quality: number;
  code_correctness: number;
  code_efficiency: number;
  code_maintainability: number;
  feedback_message: string;
};

export const createChallengeSchema = {
  name: 'create_challenge',
  description:
    'Creates a challenge for the developer to solve. This challenge is usually a coding challenge.',
  type: 'object',
  properties: {
    challenge: {
      type: 'string',
      description: 'The challenge that the developer has to solve.',
    },
  },
  required: ['challenge'],
};
