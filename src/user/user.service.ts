import { Injectable } from '@nestjs/common';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/backend';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './folder/user.dto';
import { ClerkWebhookHeadersDto } from './dto/clerk-webhook-headers.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
    // todo: figure out why the user service is being initialized twice
    console.log('UserService instantiated');
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

  async clerkWebhook(headers: ClerkWebhookHeadersDto, body: any) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error('Missing Clerk Webhook Secret');
    }

    const svixId = headers['svix-id'];
    const svixTimestamp = headers['svix-timestamp'];
    const svixSignature = headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new Error('Missing Clerk Webhook Headers');
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(JSON.stringify(body), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as WebhookEvent;
    } catch (e) {
      console.error(e);
      throw new Error('Invalid Clerk Webhook Signature');
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', body);

    // Handle the event
    switch (eventType) {
      case 'user.created':
        // Handle user created event
        break;
      case 'user.updated':
        // Handle user updated event
        break;
      default:
        console.log('Unhandled event type');
    }

    return {
      id,
      eventType,
    };
  }
}
