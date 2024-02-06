import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { LangchainModule } from 'src/langchain/langchain.module';
import { QuestionsService } from 'src/questions/questions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [LangchainModule, PrismaModule],
  providers: [PineconeService, QuestionsService],
  exports: [PineconeService],
})
export class PineconeModule {}
