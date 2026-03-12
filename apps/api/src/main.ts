import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  const logger = new Logger('Bootstrap');

  app.enableShutdownHooks();

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  const port = 3000;
  const host = '0.0.0.0';

  await app.listen(port, host);

  logger.log(`HTTP running on http://${host}:${port}`);
  logger.log(`GraphQL endpoint on http://${host}:${port}/graphql`);
}

void bootstrap();