import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './config';
import { GlobalInterceptor } from './handlers/interceptors/global.interceptor';
import { JwtAuthGuard } from './handlers/guards/auth.guard';
import { RoleGuard } from './handlers/guards/role.guard';
import { ValidationPipe } from '@nestjs/common';
import { GlobalException } from './handlers/exceptions/global.exception';
import { info } from './library/logger';
import helmet from 'helmet';

async function bootstrap() {
  const { appName, port, version } = config;
  const url = `/${version}`;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['warn', 'error'],
    cors: true,
  });

  const options = new DocumentBuilder()
    .addServer(`${url}`)
    .setTitle(appName)
    .setDescription('The API Documentation')
    .setVersion(version)
    .addBearerAuth()
    .setContact('Suren K', 'jsworkbench.com', 'suren@jsworkbench.com')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const { httpAdapter } = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);

  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: `${appName} Api Docs`,
    customCss: '.swagger-ui .topbar{display:none}',
  });

  app.setGlobalPrefix(version);
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalFilters(new GlobalException(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RoleGuard(reflector));
  app.use(helmet());
  app.set('trust proxy', 1);

  await app.listen(port, () => {
    info(`${appName} is running in http://localhost:${port}${url}`);
  });
}
bootstrap();
