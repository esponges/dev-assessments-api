import { Module } from '@nestjs/common';
import { LangchainModule } from 'src/langchain/langchain.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [LangchainModule, PrismaModule],
})
export class AssessmentsModule {}
