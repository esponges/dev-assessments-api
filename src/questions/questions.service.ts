import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestions(questionsIds: string[]) {
    return this.prismaService.question.findMany({
      where: {
        id: {
          in: questionsIds,
        },
      },
    });
  }
}
