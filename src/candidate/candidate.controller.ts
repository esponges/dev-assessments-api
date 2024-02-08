import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('parse_resume')
  @UseInterceptors(FileInterceptor('file'))
  parseResume(@UploadedFile() file: Express.Multer.File) {
    const blob = new Blob([file.buffer], { type: 'application/pdf' });
    return this.candidateService.parseResume(blob);
  }
}
