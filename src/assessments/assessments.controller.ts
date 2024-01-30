import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('assessments')
export class AssessmentsController {
  constructor() {} // will add service later

  @Get()
  getAssessments(): string {
    return 'This will return all assessments';
  }
}
