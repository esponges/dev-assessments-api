import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { EvaluateAssessmentDto } from './dto/evaluate-assessment.dto';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get()
  getAssessments(): string {
    return this.assessmentsService.getAssessments();
  }

  @Post('create')
  createAssessment(@Body() createAssessmentBody: CreateAssessmentDto) {
    return this.assessmentsService.createAssessment(createAssessmentBody);
  }

  @Post('evaluate')
  evaluateAssessment(@Body() evaluateAssessmentBody: EvaluateAssessmentDto) {
    return this.assessmentsService.evaluateAssessment({
      // todo: figure out how to send the code snippet as a string
      response: JSON.parse(evaluateAssessmentBody.response),
      ...evaluateAssessmentBody,
    });
  }
}
