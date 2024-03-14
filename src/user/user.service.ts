import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './folder/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
    console.log('UserService constructor');
  }

  async create(body: UserDto) {
    return this.prismaService.user.create({ data: body });
  }

  async upsert(body: UserDto) {
    return this.prismaService.user.upsert({
      where: { id: body.id },
      update: body,
      create: body,
    });
  }
}
