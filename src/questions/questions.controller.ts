import { Body, Controller, Post } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeService } from 'src/pinecone/pinecone.service';
import { GetQuestionsDto } from './dto/get-questions';

@Controller('questions')
export class QuestionsController {
  // todo: probably won't need this service
  private readonly pineconeClient: Pinecone;

  constructor(private readonly pineconeService: PineconeService) {
    this.pineconeClient = pineconeService.getClient();
  }

  @Post()
  async getQuestions(@Body() getQuestionsDto: GetQuestionsDto) {
    return await this.pineconeService.makeSimilaritySearch(
      getQuestionsDto.query,
      getQuestionsDto.namespace,
      getQuestionsDto.k,
      getQuestionsDto.filter,
    );
  }
}
