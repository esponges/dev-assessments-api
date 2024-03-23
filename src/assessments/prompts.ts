import { Prompt } from 'src/types';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { EvaluateChallengeDto } from './dto/evaluate-challenge.dto';
import { AssessmentQuestion } from 'src/models';

export const createStackList = (
  stack: {
    tech: string;
    experience: number;
  }[],
) => {
  return stack.map((s) => `- ${s.tech}: ${s.experience} years`).join('\n');
};

export const getAssessmentPrompt = (details?: CreateAssessmentDto): Prompt => {
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

  const { stack, level, number_of_questions, duration, promptOpt } = details;

  switch (promptOpt) {
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
          - The difficulty tag of the question should be according the aforementioned experience bullet points.
          - The questions could be multiple choice or free response, depending on the difficulty level. Please use the provided schema your JSON response.
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
          `
        You are an AI assistant for creating unique code assessment for a software developer with the following criteria: {description}
        
        You will be provided with a stack of technologies from the developer experience. 
        The difficulty of each question will be inferred from the experience of each stack.
        Don't exceed the number of questions provided. Priority should be given to the stack with the most experience.
        
        Use the following criteria to generate the questions per stack:
        - 0-2 years of experience. The questions should have easy difficulty and multiple choice. Responses should not be too obvious.
        - 2-5 years of experience. The questions should have medium difficulty and cover the intermediate topics, should be a mix of multiple choice and free response. 
          When multiple choice, the options should be challenging.
        - 5+ years of experience. The questions should have hard difficulty and cover the advanced topics and should mostly be free response and challenging.

        Key guidelines:
        
        - Please use the above criteria to generate the questions.
        - The questions should be unique and not repeated.
        - The questions should be based in the latest knowledge from the technology. For example, if the stack is React, the question should avoid class components.
        - The questions should be tailored to the level of the stack experience.
        - The questions should be clear and concise.
        - The questions should be challenging according to the experience and not generic.

        Example provided stack:
        - Golang: 1.5 years
        - React: 5 years

        Considering this example you would generate 20% of easy questions for Golang and 80% hard questions for React. 
        `,
        ],
        description: `An assessment for a software developer with the following stack: 
        \n${stackList}.
        \nWith ${number_of_questions} questions. 
        \n${duration ? `That should be completed in ${duration} minutes` : ''}`,
      };
  }
  return defaultCase;
};

export const getEvaluateChallengePrompt = ({
  challenge,
  devResponse,
  promptOpt,
}: EvaluateChallengeDto): Partial<Prompt> & {
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

export const getEvaluateAssessmentPrompt = (evaluateAssessmentBody: {
  questions: Array<AssessmentQuestion & { question: string }>;
}): Partial<Prompt> & {
  assessment: string;
} => {
  return {
    promptMessages: [
      'human',
      `You are an AI assistant for evaluating the response of a software developer to an assessment questions

      Please use the following criteria:
      The response will be evaluated based on the following criteria:
      - should be as closest as possible to the canonical answers
      - should consider the latest best practices and standards
      - should use your knowledge of the language and the framework to evaluate the response

      The score will be returned in the 0-100 range, with 100 being the best score.
      
      Key guidelines:
      - Your feedback should be clear and concise.
      - You will use your knowledge of the language and the framework to evaluate the response.
      - Your evaluation should be fair and unbiased.
      - You should consider the latest best practices and standards.
      
      The assessment with their respective responses are: {assessment}`,
    ],
    assessment: evaluateAssessmentBody.questions
      .map((q) => `Id: ${q.id}, Question: ${q.question}, Answer: ${q.answer}`)
      .join('\n'),
  };
};

export const getCreateChallengePrompt = (
  experience: string,
): Partial<Prompt> => {
  return {
    promptMessages: [
      'human',
      `As an AI assistant, your task is to generate a unique code assessment challenge tailored to the technical skills of a software developer 
      based on their experience with a specific technology/framework: {description}\n\n
      
      The assessment will consist of solving a single coding problem using the developer's technology/framework. 
      The duration for solving the problem should not exceed 30 minutes.\n\nYour 
      
      input will include the developer's stack, which comprises a single technology/framework along with the number of years of experience.\n\n
      
      Use the following criteria to generate the problem:\n
      - For developers with 0-2 years of experience in the specified technology, create a problem focusing on fundamental concepts.\n
      - For developers with 2-7 years of experience, generate a problem covering intermediate topics.\n
      - For developers with 7+ years of experience, create a challenging problem focusing on advanced topics.\n\n
      
      Key guidelines:\n
      - The task should be solvable offline (white-boarding) and without any kind of compiler or IDE.\n
      - Avoid data structures and algorithms problems and focus on real-world scenarios.\n
      - Ensure the problem is unique and not repeated.\n
      - Tailor the problem to the level of experience with the specified technology.\n
      - The problem should be solvable within 30 minutes, preferably with code or partial pseudocode.\n\n
      
      Example provided technology/framework: React 5 years.\n\n
      A challenge for this example could be to create a custom hook that fetches data from an API and handles loading, error, and success states.\n\n 
    `,
    ],
    description: `An challenge for a software developer with the following experience:\n\n${experience}.`,
  };
};
