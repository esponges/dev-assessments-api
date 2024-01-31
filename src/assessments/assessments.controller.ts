import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get()
  getAssessments(): string {
    return this.assessmentsService.getAssessments();
  }

  @Post('create')
  createAssessment(@Body() createAssessmentBody: CreateAssessmentDto) {
    console.log(createAssessmentBody);
    return this.assessmentsService.createAssessment();
  }
}
