import { Module } from '@nestjs/common';
import { LangchainModule } from 'src/langchain/langchain.module';

@Module({
  imports: [LangchainModule],
})
export class AssessmentsModule {}
