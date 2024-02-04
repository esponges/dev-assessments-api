import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { LangchainModule } from 'src/langchain/langchain.module';

@Module({
  imports: [LangchainModule],
  providers: [PineconeService],
  exports: [PineconeService],
})
export class PineconeModule {}
