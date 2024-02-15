import { CreateAssessmentDto } from '../dto/create-assessment.dto';

export const getAssessmentPrompt = (
  details?: CreateAssessmentDto,
  type?: number,
): {
  promptMessages: string[];
  description: string;
} => {
  const defaultCase = {
    promptMessages: [
      'human',
      'An assessment with 10 questions for a software developer with the following topics and level: {description}',
    ],
    description: 'Full stack golang (backend) and React (front end)',
  };

  const { stack, level, number_of_questions, duration } = details;

  switch (type) {
    case 1:
      return {
        /* 
          the model is ignoring the difficulty (level)
        */
        promptMessages: [
          'human',
          `An assessment with ${number_of_questions} ${level} questions for a software developer with the following topics and level: {description}`,
        ],
        description: `Should cover all these topics: ${stack.join(', ')} ${duration ? ` that should be completed ${duration} minutes` : ''}`,
      };
    case 2:
      // try to get it to really understand the difficulty
      /* 
        still giving similar questions, it improve a bit by passing more options to the stack
      */
      return {
        promptMessages: [
          'human',
          `An assessment for a software developer with the following topics and difficulty: {description}`,
        ],
        description: `Question count: ${number_of_questions}. Should cover all these topics: ${stack.join(', ')} ${duration ? ` that should be completed ${duration} minutes` : ''} with a ${level} difficulty`,
      };
    case 3:
      return {
        // this has greatly improved the results and does not ignore the difficulty
        promptMessages: [
          'human',
          `You are an AI assistant for creating unique code assessment for a software developer with the following criteria: {description}
          
          You will be provided with a level, number of questions, and the stack of the developer. The level can be one of the following:

          - Junior: 0-2 years of experience. The questions should be easy and cover the basics.
          - Mid: 2-5 years of experience. The questions should be moderate and cover the intermediate topics, some advanced topics may be included. 
          - Senior: 5+ years of experience. The questions should be difficult and cover the advanced topics, some intermediate topics may be included.
          
          Key guidelines:
          
          - The questions should be unique and not repeated.
          - The questions should be tailored to the level of the developer.
          - The questions should cover all the topics in the stack.
          - The questions should be clear and concise.
          - The questions should be challenging and not generic.
          - The questions could be multiple choice or free response, depending on the difficulty level. Please use the provided schema to generate the questions,
          `,
        ],
        description: `An assessment for a ${level} software developer with ${number_of_questions} questions.
        Should cover all these topics: ${stack.join(', ')} ${duration ? ` that should be completed ${duration} minutes` : ''}`,
      };
  }
  return defaultCase;
};
