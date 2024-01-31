import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentsController } from './assessments/assessments.controller';
import { AssessmentsService } from './assessments/assessments.service';
import { LangchainService } from './langchain/langchain.service';

@Module({
  imports: [],
  controllers: [AppController, AssessmentsController],
  providers: [AppService, AssessmentsService, LangchainService],
})
export class AppModule {}
