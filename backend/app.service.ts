import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { config } from './config';
import { AppStatus } from '@sz/interface';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}
  appStatus(): AppStatus {
    return {
      message: `${config.appName} is running in port ${config.port}. Connected to ${this.connection.name}`,
    };
  }
}
