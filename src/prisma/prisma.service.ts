import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    console.log('PrismaService constructor created');
  }

  async onModuleInit() {
    await this.$connect();
  }
}
