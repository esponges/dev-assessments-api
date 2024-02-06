import { Body, Controller, Post } from '@nestjs/common';
import { PineconeService } from 'src/pinecone/pinecone.service';
import { GetQuestionsDto } from './dto/get-questions';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly pineconeService: PineconeService) {}

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
