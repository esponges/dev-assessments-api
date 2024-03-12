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
    const content = new Blob([file.buffer], { type: 'application/pdf' });
    // fix-this: having trouble transforming the string to boolean with class-transformer
    const upsert = body.upsert === 'true';

    return this.candidateService.parseResume(content, body.userId, upsert);
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
