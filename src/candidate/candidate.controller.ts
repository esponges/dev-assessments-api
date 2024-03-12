import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CandidateService } from './candidate.service';
import { ParseResumeDto } from './dto/parse-resume.dto';
import { SimilarCandidatesDto } from './dto/similar-candidates.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('resume/parse')
  @UseInterceptors(FileInterceptor('file'))
  parseResume(
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: ParseResumeDto,
  ) {
    let content: Blob | string = '';

    if (file) {
      content = new Blob([file.buffer], { type: 'application/pdf' });
    } else {
      content = body.args.resume;
    }

    if (!content) throw new Error('No resume provided');

    return this.candidateService.parseResume(content, '', body.args.upsert);
  }

  @Post('similarity_search')
  async getSimilarCandidates(@Body() body: SimilarCandidatesDto) {
    // todo implement metadata filtering
    return this.candidateService.getSimilarCandidates(body.description);
  }

  @Get('details')
  // query params contain the id
  async getCandidate(@Query('id') id: string) {
    return this.candidateService.getCandidate(id);
  }
}
