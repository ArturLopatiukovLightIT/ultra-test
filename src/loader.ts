import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfiguration } from './config/configurations/app.configuration';
import * as assert from 'assert';

const createOpenAPI = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Ultra-test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
};

export const mainApplicationLoader = async (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfiguration>('app');
  assert(appConfig, '"appConfig" is required');

  app.setGlobalPrefix('api');

  createOpenAPI(app);

  // Starts listening for shutdown hooks
  await app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  return appConfig;
};
