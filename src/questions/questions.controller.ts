import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeService } from 'src/pinecone/pinecone.service';

@Controller('questions')
export class QuestionsController {
  // todo: is this a proper way to inject the pinecone service?
  private readonly pineconeClient: Pinecone;

  constructor(private readonly pineconeService: PineconeService) {
    this.pineconeClient = pineconeService.getClient();
  }

  @Get()
  getQuestions(/* count: number */): string {
    return 'This will return all questions';
  }
}
