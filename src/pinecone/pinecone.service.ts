import { OpenAIEmbeddings } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class PineconeService {
  private pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? '',
    environment: process.env.PINECONE_ENVIRONMENT ?? '',
  });
  private openAIEmbeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY ?? '',
    modelName: 'text-embedding-3-small',
  });

  constructor(private readonly questionsService: QuestionsService) {
    console.log('PineconeService constructor created');
  }

  getClient() {
    return this.pineconeClient;
  }

  getIndex() {
    return this.pineconeClient.Index(process.env.PINECONE_INDEX_NAME ?? '');
  }

  async makeSimilaritySearch(
    query: string,
    namespace: string,
    k?: number,
    filter?: Record<string, any>,
  ) {
    const embedding = await this.openAIEmbeddings.embedQuery(query);
    const index = this.getIndex();

    const search = await index.namespace(namespace).query({
      vector: embedding,
      topK: k || 5,
      filter: filter || {},
      includeMetadata: true,
      // includeValues: true,
    });

    const searchIds = search.matches.map((match) => match.id);
    const questions = await this.questionsService.getQuestions(searchIds);

    // todo: create endpoint to fetch the actual data from the search results
    // or we get only vectors (not natural language) which are not useful
    return {
      similaritySearchResults: search,
      questions,
    };
  }

  // todo: add to the postgres db
  async upsert(
    content: string,
    namespace: string,
    metadata: Record<string, any>,
  ) {
    const embedding = await this.openAIEmbeddings.embedQuery(content);
    const index = this.getIndex();

    const vectorData = {
      id: metadata.id,
      values: embedding,
      metadata,
    };

    try {
      await index.namespace(namespace).upsert([vectorData]);
    } catch (e) {
      console.log('error upserting in pinecone', e);
    }
  }
}
