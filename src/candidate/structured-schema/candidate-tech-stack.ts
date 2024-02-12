// get candidate tech stack prompt
// a schema that returns a structured schema with the candidate's tech stack and the years of experience in each tech stack
export const candidateTechStackSchema = {
  name: 'candidate_tech_stack',
  description:
    'Returns a structured schema with the candidate tech stack and the years of experience in each tech stack.',
  type: 'object',
  properties: {
    tech_stack: {
      type: 'array',
      description: 'An array of tech stack and the years of experience.',
      items: {
        type: 'object',
        properties: {
          tech: { type: 'string' },
          years_of_experience: { type: 'number' },
        },
        required: ['tech', 'years_of_experience'],
      },
    },
  },
};

export type CandidateTechStackSchemaLLMResponse = {
  tech_stack: {
    tech: string;
    years_of_experience: number;
  }[];
};
