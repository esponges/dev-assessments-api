import { Injectable } from '@nestjs/common';

import { LangchainService } from 'src/langchain/langchain.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import {
  getAssessmentPrompt,
  getEvaluateChallengePrompt,
  getEvaluateAssessmentPrompt,
  getCreateChallengePrompt,
} from './prompts';
import {
  CreateAssessmentResponse,
  createAssessmentSchema,
} from './structured-schema/assessment-schemas';
import {
  evaluateChallengeSchema,
  createChallengeSchema,
} from './structured-schema/challenge-schemas';
import { PrismaService } from 'src/prisma/prisma.service';
import { EvaluateChallengeDto } from './dto/evaluate-challenge.dto';
import { EvaluateAssessmentDto } from './dto/evaluate-assessment.dto';
import {
  type EvaluateAssessmentResponse,
  evaluateAssessmentSchema,
} from './structured-schema/assessment-schemas';

@Injectable()
export class AssessmentsService {
  private readonly createAssessmentSchema = createAssessmentSchema;
  private readonly evaluateChallengeSchema = evaluateChallengeSchema;
  private readonly evaluateAssessmentSchema = evaluateAssessmentSchema;
  private readonly createChallengeSchema = createChallengeSchema;

  constructor(
    private readonly langchain: LangchainService,
    private readonly prisma: PrismaService,
  ) {}

  getAssessments(): string {
    return 'This will return all assessments';
  }

  async createAssessment(details: CreateAssessmentDto) {
    const response = await this.langchain.getStructuredResponse<
      CreateAssessmentDto,
      CreateAssessmentResponse
    >(details, this.createAssessmentSchema, getAssessmentPrompt);

    // todo: save the questions to the vector db
    // this way in the future we can reuse questions
    const newAssessment = await this.prisma.assessment.create({
      data: {
        title: response.title || 'Assessment',
        questions: {
          createMany: {
            data: response.questions.map((q) => ({
              text: q.question_text,
              type: q.question_type,
              choices: q.choices?.length ? q.choices : undefined,
              correctAnswer: q.correct_answer,
              difficulty: q.difficulty,
              topic: q.stack,
            })),
          },
        },
      },
    });

    const assessment = await this.prisma.assessment.findUnique({
      where: {
        id: newAssessment.id,
      },
      include: {
        questions: true,
      },
    });

    return assessment;
  }

  async evaluateChallenge(details: EvaluateChallengeDto) {
    const response =
      await this.langchain.getStructuredResponse<EvaluateChallengeDto>(
        details,
        this.evaluateChallengeSchema,
        getEvaluateChallengePrompt,
      );

    // todo: save in challenge along with the response
    return response;
  }

  async createChallenge(experience: string) {
    const response = await this.langchain.getStructuredResponse<string>(
      experience,
      this.createChallengeSchema,
      getCreateChallengePrompt,
    );

    return response;
  }

  async evaluateAssessment(details: EvaluateAssessmentDto) {
    const questions = await this.prisma.assessmentQuestion.findMany({
      where: {
        id: {
          in: details.questions.map((q) => q.id),
        },
      },
      select: {
        id: true,
        type: true,
        text: true,
        correctAnswer: true,
      },
    });

    // match the questions with the answers from the details
    const questionsWithDevAnswers = questions.map((q) => ({
      ...q,
      answer: details.questions.find((a) => a.id === q.id)?.answer,
    }));

    const freeResponseQuestions = questionsWithDevAnswers.filter(
      (q) => q.type === 'FREE_RESPONSE',
    );

    // evaluate only the free response questions
    const { promptMessages, assessment } = getEvaluateAssessmentPrompt({
      questions: freeResponseQuestions.map((q) => ({
        id: q.id,
        answer: q.answer,
        question: q.text,
      })),
    });

    const prompt = this.langchain.generatePrompt(promptMessages);
    const runnable = this.langchain.getRunnable(
      this.evaluateAssessmentSchema,
      prompt,
    );

    const freeResponseEvaluationResponse = (await runnable.invoke({
      assessment,
    })) as EvaluateAssessmentResponse;

    // join the free response evaluation back with the multiple choice questions
    let totalScore = 0;
    const evaluatedAssessment = questionsWithDevAnswers.map((q) => {
      if (q.type === 'FREE_RESPONSE') {
        const evaluation =
          freeResponseEvaluationResponse.questionsEvaluation.find(
            (e) => e.question_id === q.id,
          );

        totalScore += evaluation?.score || 0;
        return {
          ...q,
          score: evaluation?.score,
          feedbackMessage: evaluation?.feedback_message,
        };
      } else {
        const score = q.answer === q.correctAnswer ? 100 : 0;
        totalScore += score;
        return {
          ...q,
          score,
          feedbackMessage: 'N/A',
        };
      }
    });

    const finalScore = totalScore / questions.length;

    await this.prisma.assessment.update({
      where: {
        id: details.assessmentId,
      },
      data: {
        evals: {
          createMany: {
            data: evaluatedAssessment.map((q) => ({
              score: q.score,
              feedback: q.feedbackMessage,
              questionId: q.id,
            })),
          },
        },
      },
    });

    return {
      totalScore: finalScore,
      evaluatedAssessment,
    };
  }
}
