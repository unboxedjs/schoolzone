import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { GlobalInterceptor } from './handlers/interceptors/global.interceptor';

async function bootstrap() {
  const { appName, port, version } = config;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(version);
  app.useGlobalInterceptors(new GlobalInterceptor());
  await app.listen(port, () => {
    console.info(
      `${appName} is running in http://localhost:${port}/${version}`,
    );
  });
}
bootstrap();
