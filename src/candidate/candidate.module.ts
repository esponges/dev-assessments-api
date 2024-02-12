import { Module } from '@nestjs/common';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { LangchainModule } from 'src/langchain/langchain.module';
import { PineconeModule } from 'src/pinecone/pinecone.module';

@Module({
  imports: [LangchainModule, PineconeModule],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
