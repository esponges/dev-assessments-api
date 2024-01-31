import { Injectable } from '@nestjs/common';
import { LangchainService } from 'src/langchain/langchain.service';

@Injectable()
export class AssessmentsService {
  constructor(private readonly langchain: LangchainService) {
    // console.log('AssessmentsService constructor created');
  }

  getAssessments(): string {
    return 'This will return all assessments';
  }
}
