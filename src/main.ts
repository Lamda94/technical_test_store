import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  
  app.useBodyParser('json', { limit: '50mb' });

  const config = new DocumentBuilder()
    .setTitle('Strore (Dev)')
    .setDescription('Backend del producto web strore.')
    .setVersion('1.0.0')
    .addTag('Article', 'Services for articles')
    .addTag('Customer', 'Services for customers')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT_APP ?? 3005;
  await app.listen(port);
  console.log("App is running on port: #", port);
}
bootstrap();
