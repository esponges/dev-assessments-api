import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { EvaluateChallengeDto } from './dto/evaluate-challenge.dto';
import { EvaluateAssessmentDto } from './dto/evaluate-assessment.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get()
  getAssessments(): string {
    return this.assessmentsService.getAssessments();
  }

  // todo: probably rename to create/questions
  @Post('create')
  createAssessment(@Body() createAssessmentBody: CreateAssessmentDto) {
    return this.assessmentsService.createAssessment(createAssessmentBody);
  }

  @Post('challenge/create')
  createChallenge(@Body() createChallengeBody: CreateChallengeDto) {
    return this.assessmentsService.createChallenge(
      createChallengeBody.experience,
    );
  }

  @Post('challenge/evaluate')
  evaluateChallenge(@Body() evaluateAssessmentBody: EvaluateChallengeDto) {
    return this.assessmentsService.evaluateChallenge({
      // todo: this replace is a temporary workaround to send the response from postman
      devResponse: evaluateAssessmentBody.devResponse.replaceAll(`'`, `"`),
      ...evaluateAssessmentBody,
    });
  }

  @Post('questions/evaluate')
  evaluateAssessment(@Body() evaluateAssessmentBody: EvaluateAssessmentDto) {
    return this.assessmentsService.evaluateAssessment(evaluateAssessmentBody);
  }
}
