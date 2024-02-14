import { Module } from '@nestjs/common';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { LangchainModule } from 'src/langchain/langchain.module';
import { PineconeModule } from 'src/pinecone/pinecone.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [LangchainModule, PineconeModule, PrismaModule],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
