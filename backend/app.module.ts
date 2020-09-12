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
import { MicroModule } from './controllers/micro/micro.module';
// import { DashboardModule } from './controllers/dashboard/dashboard.module';
// import { TravelModule } from './controllers/travel/travel.module';
// import { EventModule } from './controllers/event/event.module';
// import { ActivityModule } from './controllers/activity/activity.module';
// import { FeeModule } from './controllers/fee/fee.module';
// import { InteractionModule } from './controllers/interaction/interaction.module';
// import { SettingModule } from './controllers/setting/setting.module';
import * as lb from '@google-cloud/logging-bunyan';
import rateLimit from 'express-rate-limit';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    UserModule,
    MicroModule,
    // DashboardModule,
    // TravelModule,
    // EventModule,
    // ActivityModule,
    // FeeModule,
    // InteractionModule,
    // SettingModule,
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
