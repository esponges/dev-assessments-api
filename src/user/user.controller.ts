import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './folder/user.dto';
import { ClerkWebhookHeadersDto } from './dto/clerk-webhook-headers.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('webhook')
  // body typed as any since clerk docs don't provide types for the body
  async webhook(@Headers() headers: ClerkWebhookHeadersDto, @Body() body: any) {
    return this.userService.clerkWebhook(headers, body);
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
