import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppStatus } from '@sz/interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): AppStatus {
    return this.appService.appStatus();
  }
}
