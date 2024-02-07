import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentsController } from './assessments/assessments.controller';
import { AssessmentsService } from './assessments/assessments.service';
import { LangchainModule } from './langchain/langchain.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';
import { PineconeModule } from './pinecone/pinecone.module';
import { PrismaModule } from './prisma/prisma.module';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [
    LangchainModule,
    AssessmentsModule,
    ConfigModule.forRoot(),
    QuestionsModule,
    PineconeModule,
    PrismaModule,
    CandidateModule,
  ],
  controllers: [AppController, AssessmentsController, QuestionsController],
  providers: [AppService, AssessmentsService, QuestionsService],
})
export class AppModule {}
