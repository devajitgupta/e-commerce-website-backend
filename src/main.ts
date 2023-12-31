import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  //Middlewares
  app.enableCors();
  app.enableCors({
    origin: [
      configService.get<string>('PROD_DOMAIN'),
      configService.get<string>('LOCAL_DOMAIN'),
      configService.get<string>('DEV_DOMAIN'),
    ],
    credentials: true,
  });

  // Swagger Initialization
  const config = new DocumentBuilder()
    .setTitle('E-commerce website')
    .setDescription('Manage your account here with A.I')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('E-commerce website')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get<number>('PORT') || 3001; // Default to port 3000 if PORT is not specified in the config
  await app.listen(port);
  Logger.log(`Services running at PORT ${port}`);
}
bootstrap();
