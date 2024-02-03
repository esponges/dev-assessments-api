import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService {
  private pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? '',
    environment: process.env.PINECONE_ENVIRONMENT ?? '',
  });

  constructor() {
    console.log('PineconeService constructor created');
  }

  getClient() {
    return this.pineconeClient;
  }

  // getSimilarItems(k: number, namespace: string, filters: Record<string, any>) {
  //   return this.pineconeClient.getSimilarItems(k, namespace, filters);
  // }
}
