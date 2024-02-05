import { OpenAIEmbeddings } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { LangchainService } from 'src/langchain/langchain.service';

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

  constructor(private readonly langchainService: LangchainService) {
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
      includeValues: true,
    });

    // todo: create endpoint to fetch the actual data from the search results
    // or we get only vectors (not natural language) which are not useful
    return search;
  }
}
