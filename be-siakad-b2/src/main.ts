import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      // ini penting
      exceptionFactory: (errors) => {
        const messages = errors.map(err => ({
          field: err.property,
          messages: Object.values(err.constraints || {})
        }));
        return new BadRequestException(messages);
      },
    })
  );
  
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
