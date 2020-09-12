import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppStatus, Config } from '@sz/interface';
import { ApiTags } from '@nestjs/swagger';
import { Controls, CRUD } from './enums';
import { Api } from './handlers/decorators/api.decorators';
import { config } from './config';

const name = Controls.Common;
@ApiTags(name)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('config')
  @Api(name, CRUD.CONFIG, { allow: [] })
  getConfig(): Config {
    return { map: config.mapKey };
  }

  @Get()
  @Api(name, CRUD.HEALTH)
  healthCheck(): AppStatus {
    return this.appService.appStatus();
  }
}
