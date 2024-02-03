import { Module } from '@nestjs/common';
import { PineconeModule } from 'src/pinecone/pinecone.module';

@Module({
  imports: [PineconeModule],
})
export class QuestionsModule {}
