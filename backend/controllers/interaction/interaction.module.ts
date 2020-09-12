import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  controllers: [ForumController, MessageController],
  providers: [ForumService, MessageService]
})
export class InteractionModule {}
