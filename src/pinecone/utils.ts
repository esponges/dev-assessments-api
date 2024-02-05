import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeIndex = async (client: Pinecone) => {
  try {
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME ?? '');

    return pineconeIndex;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to get Pinecone Index');
  }
};

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
  environment: process.env.PINECONE_ENVIRONMENT || '',
});
