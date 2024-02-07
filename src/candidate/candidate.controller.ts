import { Controller, Post } from '@nestjs/common';
import { CandidateService } from './candidate.service';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('parse_resume')
  parseResume() {
    return this.candidateService.parseResume();
  }
}
