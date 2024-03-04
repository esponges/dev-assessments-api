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
} from './structured-schema/structured-quiz-schema';
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
} from './structured-schema/evaluate-assessment-schema';

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
              text: q.question_text,
              type: q.question_type,
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
  async evaluateChallenge(details: EvaluateChallengeDto) {
    const { challenge, devResponse, promptMessages } =
      getEvaluateChallengePrompt(details);
    const prompt = this.langchain.generatePrompt(promptMessages);
    const runnable = this.langchain.getRunnable(
      this.evaluateChallengeSchema,
      prompt,
    );

    const response = await runnable.invoke({
      challenge,
      devResponse,
    });

    return response;
  }

  async createChallenge(experience: string) {
    const { promptMessages, description } =
      getCreateChallengePrompt(experience);
    const prompt = this.langchain.generatePrompt(promptMessages);
    // todo: add schema
    const runnable = this.langchain.getRunnable(
      this.createChallengeSchema,
      prompt,
    );

    const response = await runnable.invoke({
      description: description,
    });

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

    return {
      totalScore: totalScore / questions.length,
      evaluatedAssessment,
    };
  }
}
