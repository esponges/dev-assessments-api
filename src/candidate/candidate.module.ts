import { Module } from '@nestjs/common';
import { CandidateController } from './candidate.controller';

@Module({
  controllers: [CandidateController],
})
export class CandidateModule {}
