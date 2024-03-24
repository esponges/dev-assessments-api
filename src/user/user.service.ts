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
    // todo: handle events in the db
    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        const data = {
          email: evt.data.email_addresses[0].email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          createdAt: new Date(evt.data.created_at).toISOString(),
          updatedAt: new Date(evt.data.updated_at).toISOString(),
          lastSeen: new Date(evt.data.last_sign_in_at).toISOString(),
          // todo: support roles using orgs - candidate is default atm
        };
        return this.prismaService.user.upsert({
          where: { id },
          update: data,
          create: { id, ...data },
        });
      case 'session.created':
        // just update the last seen
        return this.prismaService.user.update({
          where: { id },
          data: { lastSeen: new Date().toISOString() },
        });
      // want to handle these?
      case 'session.ended':
      case 'session.removed':
      case 'session.revoked':
      default:
        console.log('Unhandled event type');
    }

    return {
      id,
      eventType,
    };
  }
}
