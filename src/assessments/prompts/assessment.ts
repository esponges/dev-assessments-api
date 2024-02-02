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

  switch (type) {
    case 1:
      return {
        promptMessages: [
          'human',
          `An assessment with ${details.number_of_questions} ${details.level} questions for a software developer with the following topics and level: {description}`,
        ],
        description:
          'Full stack golang (backend) and React (front end) for a web application with 7 years of experience.',
      };
  }
  return defaultCase;
};
