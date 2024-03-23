import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './folder/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('webhook')
  async webhook(@Headers() headers: any) {
    return headers;
  }

  @Post('upsert')
  async upsert(@Body() body: UserDto) {
    return this.userService.upsert(body);
  }

  @Post('create')
  async create(@Body() body: UserDto) {
    return this.userService.create(body);
  }
}
