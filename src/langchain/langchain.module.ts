import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';

// creating a singleton service
// https://stackoverflow.com/questions/60192912/how-to-create-a-service-that-acts-as-a-singleton-with-nestjs
@Module({
  providers: [LangchainService],
  exports: [LangchainService],
})
export class LangchainModule {}
