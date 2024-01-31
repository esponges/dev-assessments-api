import { Injectable } from '@nestjs/common';

@Injectable()
export class AssessmentsService {
  constructor() {}

  getAssessments(): string {
    return 'This will return all assessments';
  }
}
