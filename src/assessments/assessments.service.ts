import { Injectable } from '@nestjs/common';

import { LangchainService } from 'src/langchain/langchain.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { getAssessmentPrompt, getEvaluateAssessmentPrompt } from './prompts';
import {
  CreateAssessmentResponse,
  createAssessmentSchema,
} from './structured-schema/structured-quiz-schema';
import { evaluateAssessmentSchema } from './structured-schema/evaluate-assessment-schema';
import { EvaluateAssessmentDto } from './dto/evaluate-assessment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssessmentsService {
  private readonly createAssessmentSchema = createAssessmentSchema;
  private readonly evaluateAssessmentSchema = evaluateAssessmentSchema;
  constructor(
    private readonly langchain: LangchainService,
    private readonly prisma: PrismaService,
  ) {}

  getAssessments(): string {
    return 'This will return all assessments';
  }

  async createAssessment(details: CreateAssessmentDto) {
    const prompts = getAssessmentPrompt(details, details.promptOpt);
    const prompt = this.langchain.generatePrompt(prompts.promptMessages);
    const runnable = this.langchain.getRunnable(
      this.createAssessmentSchema,
      prompt,
    );

    const response = (await runnable.invoke({
      description: prompts.description,
    })) as CreateAssessmentResponse;

    // todo: save the questions to the vector db
    // this way in the future we can reuse questions
    const res = await this.prisma.assessment.create({
      data: {
        title: response.title || 'Assessment',
        questions: {
          createMany: {
            data: response.questions.map((q) => ({
              questionText: q.question_text,
              questionType: q.question_type,
              choices: q.choices?.length ? q.choices : undefined,
              correctAnswer: q.correct_answer,
            })),
          },
        },
      },
    });

    const assessment = await this.prisma.assessment.findUnique({
      where: {
        id: res.id,
      },
      include: {
        questions: true,
      },
    });

    return assessment;
  }

  // todo: create reusable function for this
  // it would accept a prompt and a schema
  async evaluateAssessment(details: EvaluateAssessmentDto) {
    const { challenge, devResponse, promptMessages } =
      getEvaluateAssessmentPrompt(details);
    const prompt = this.langchain.generatePrompt(promptMessages);
    const runnable = this.langchain.getRunnable(
      this.evaluateAssessmentSchema,
      prompt,
    );

    const response = await runnable.invoke({
      challenge,
      devResponse,
    });

    return response;
  }
}
