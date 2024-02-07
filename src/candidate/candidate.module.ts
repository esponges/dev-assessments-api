import { Module } from '@nestjs/common';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { LangchainModule } from 'src/langchain/langchain.module';

@Module({
  imports: [LangchainModule],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
