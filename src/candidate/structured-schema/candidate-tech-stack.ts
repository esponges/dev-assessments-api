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
          tech: {
            type: 'string',
            description:
              'The technology name - using the most common name. Eg. "React" instead of "ReactJS", "Golang" instead of "Go"',
          },
          experience: { type: 'number' },
        },
        required: ['tech', 'experience'],
      },
    },
  },
};

export type CandidateTechStackSchemaLLMResponse = {
  tech_stack: {
    tech: string;
    experience: number;
  }[];
};
