import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './folder/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('upsert')
  async upsert(@Body() body: UserDto) {
    return this.userService.upsert(body);
  }

  @Post('create')
  async create(@Body() body: UserDto) {
    return this.userService.create(body);
  }
}
