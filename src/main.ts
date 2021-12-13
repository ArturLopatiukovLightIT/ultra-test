import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { mainApplicationLoader } from './loader';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await mainApplicationLoader(app);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(config.port, async () => {
    const url = await app.getUrl();
    console.info(`Server is running at ${url}`);
    console.info(`Browse your REST API at: ${url}/swagger`);
  });
}

bootstrap();
