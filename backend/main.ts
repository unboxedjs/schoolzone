import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './config';
import { GlobalInterceptor } from './handlers/interceptors/global.interceptor';

async function bootstrap() {
  const { appName, port, version } = config;
  const url = `/${version}`;
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addServer(`${url}`)
    .setTitle(appName)
    .setDescription('The API Documentation')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  app.setGlobalPrefix(version);
  app.useGlobalInterceptors(new GlobalInterceptor());

  await app.listen(port, () => {
    console.info(`${appName} is running in http://localhost:${port}${url}`);
  });
}
bootstrap();
