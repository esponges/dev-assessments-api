import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentsController } from './assessments/assessments.controller';
import { AssessmentsService } from './assessments/assessments.service';
import { LangchainModule } from './langchain/langchain.module';
import { AssessmentsModule } from './assessments/assessments.module';

@Module({
  imports: [LangchainModule, AssessmentsModule, ConfigModule.forRoot()],
  controllers: [AppController, AssessmentsController],
  providers: [AppService, AssessmentsService],
})
export class AppModule {}
