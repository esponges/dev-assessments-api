import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentsController } from './assessments/assessments.controller';

@Module({
  imports: [],
  controllers: [AppController, AssessmentsController],
  providers: [AppService],
})
export class AppModule {}
