import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { SyllabusController } from './syllabus.controller';
import { SyllabusService } from './syllabus.service';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  controllers: [ReminderController, TimetableController, SyllabusController, ScheduleController, ResultController],
  providers: [ReminderService, TimetableService, SyllabusService, ScheduleService, ResultService],
})
export class DashboardModule {}
