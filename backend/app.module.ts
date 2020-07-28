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
import * as lb from '@google-cloud/logging-bunyan';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer): Promise<void> {
    const { mw: LoggerMiddleware } = await lb.express.middleware();
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
