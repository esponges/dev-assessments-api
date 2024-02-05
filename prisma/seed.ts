import { PrismaClient } from '@prisma/client';

type QuestionMetadata = {
  id: string;
  question_type: string;
  topic: string;
  difficulty: string;
};

type Question = {
  id: string;
  createdAt: string;
  content: string;
  metadataId: string;
  metadata: QuestionMetadata;
};

let questions: Question[];
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const data = require('../src/pinecone/scripts/load-data');
  questions = data.devAssessment;
} catch (e) {
  throw new Error('Error loading data');
}

const prisma = new PrismaClient();

async function main() {
  for (const question of questions) {
    const { id, content, metadata } = question;
    const { question_type, topic, difficulty } = metadata;

    await prisma.question.create({
      data: {
        id,
        content,
        metadata: {
          create: {
            id: metadata.id,
            question_type,
            topic,
            difficulty,
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    console.log('Data loaded');
  })
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
