import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get()
  getAssessments(): string {
    return this.assessmentsService.getAssessments();
  }

  @Post()
  createAssessment() {
    return this.assessmentsService.createAssessment();
  }
}
