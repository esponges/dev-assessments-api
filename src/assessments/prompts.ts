import { Prompt } from 'src/types';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { EvaluateAssessmentDto } from './dto/evaluate-assessment.dto';

export const createStackList = (
  stack: {
    tech: string;
    experience: number;
  }[],
) => {
  return stack.map((s) => `- ${s.tech}: ${s.experience} years`).join('\n');
};

export const getAssessmentPrompt = (
  details?: CreateAssessmentDto,
  type?: number,
): Prompt => {
  /* 
    TODO: Create an assessment considering the experience per technology
    eg. the candidate is not asked a hard question on a technology they are not proficient in
    */
  const defaultCase = {
    promptMessages: [
      'human',
      'An assessment with 10 questions for a software developer with the following topics and level: {description}',
    ],
    description: 'Full stack golang (backend) and React (front end)',
  };
  const DEFAULT_DURATION = 30;

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
          - The questions could be multiple choice or free response, depending on the difficulty level. Please use the provided schema to generate the questions.
          `,
        ],
        description: `An assessment for a ${level} software developer with ${number_of_questions} questions.
        Should cover all these topics: ${stack.join(', ')} that should be completed in ${duration || DEFAULT_DURATION} minutes`,
      };
    case 4:
      // scenario where stack details are provided, we will no longer provide the `level` of the developer
      // and the difficulty will be inferred from the experience, and the number of questions will be inferred by
      // the duration of the assessment and the complexity of the stack
      const stackList = createStackList(stack);
      return {
        promptMessages: [
          'human',
          `You are an AI assistant for creating unique code assessment for a software developer with the following criteria: {description}
        
        You will be provided with a stack of the developer. 
        The difficulty of each question will be inferred from the experience of each stack.
        
        Use the following criteria to generate the questions per stack:
        - 0-2 years of experience. The questions should be easy and multiple choice, and cover the basics.
        - 2-5 years of experience. The questions should be moderate and cover the intermediate topics, should be a mix of multiple choice and free response.
        - 5+ years of experience. The questions should be difficult and cover the advanced topics and should mostly be free response.

        Key guidelines:
        
        - The questions should be unique and not repeated.
        - The questions should be tailored to the level of the stack experience.
        - The questions should be clear and concise.
        - The questions should be challenging according to the experience and not generic.
        - Please use the above criteria to generate the questions.

        Example provided stack:
        - Golang: 1.5 years
        - React: 5 years

        Considering this example you would generate 20% of easy questions for Golang and 80% difficult questions for React. 
        `,
        ],
        description: `An assessment for a software developer with the following stack: 
        \n${stackList} 
        \nWith ${number_of_questions} questions to be completed in ${duration || DEFAULT_DURATION} minutes`,
      };
  }
  return defaultCase;
};

export const getEvaluateAssessmentPrompt = ({
  challenge,
  devResponse,
  promptOpt,
}: EvaluateAssessmentDto): Partial<Prompt> & {
  challenge: string;
  devResponse: string;
} => {
  // todo: don't use partial but create a type for PromptMessages
  const defaultCase = {
    promptMessages: [
      'human',
      `You are an AI assistant for evaluating the response of a software developer to an assessment.

      Please use the following criteria:
      The response will be evaluated based on the following criteria: 
      - code quality, 
      - code correctness 
      - code efficiency
      - code maintainability

      The score will be returned in the 0-100 range, with 100 being the best score.
      
      Key guidelines:
      - Your feedback should be clear and concise.
      - You will use your knowledge of the language and the framework to evaluate the response.
      - Your evaluation should be fair and unbiased.
      - You should consider the latest best practices and standards.
      
      The challenge for the developer is: {challenge}
      The response from the developer is: {devResponse}
      `,
    ],
    challenge: `The challenge for the developer is: ${challenge}`,
    devResponse: `The response from the developer is: ${devResponse}`,
  };

  switch (promptOpt) {
    // more prompts should be added here to evaluate the response
    default:
      return defaultCase;
  }
};
