import { Controller, Post } from '@nestjs/common';

@Controller('candidate')
export class CandidateController {
  constructor() {}

  @Post('parse_resume')
  parseResume() {
    return 'This is the parse resume endpoint';
  }
}
