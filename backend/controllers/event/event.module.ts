import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';

@Module({
  providers: [EventService, LeaveService],
  controllers: [EventController, LeaveController]
})
export class EventModule {}
