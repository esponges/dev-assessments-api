import { CreateAssessmentDto } from '../dto/create-assessment.dto';

export const getAssessmentPrompt = (
  details?: CreateAssessmentDto,
  type?: number,
) => {
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
  }
  return defaultCase;
};
