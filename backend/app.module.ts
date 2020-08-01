import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { UserModule } from './controllers/user/user.module';
import { LogController } from './controllers/log/log.controller';
import * as lb from '@google-cloud/logging-bunyan';
import rateLimit from 'express-rate-limit';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    UserModule,
  ],
  controllers: [AppController, LogController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer): Promise<void> {
    const { mw: LoggerMiddleware } = await lb.express.middleware({
      logName: config.env,
    });
    consumer
      .apply(
        LoggerMiddleware,
        rateLimit({
          windowMs: 1 * 60 * 1000,
          max: 20,
          skipSuccessfulRequests: true,
          message: `Too many failed requests, please try again after 1 minute.`,
        }),
      )
      .exclude(
        '/(.*)/logs(.*)',
        { path: `/${config.version}/`, method: RequestMethod.GET },
        { path: `/${config.version}`, method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
