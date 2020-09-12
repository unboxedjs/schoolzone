import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';

@Module({
  providers: [ActivityService, AchievementService],
  controllers: [ActivityController, AchievementController]
})
export class ActivityModule {}
