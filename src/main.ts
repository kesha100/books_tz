import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger documentation
  const options = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The books API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3030);
}
bootstrap();
