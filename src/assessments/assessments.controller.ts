import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {} // will add service later

  @Get()
  getAssessments(): string {
    return this.assessmentsService.getAssessments();
  }
}
