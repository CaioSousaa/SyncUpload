import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ServerConsole, SwaggerConsole } from './adapters/consoles';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SyncUpload')
    .setDescription(
      'Sync é uma API para estudar manipulação de registros de banco de dados',
    )
    .setVersion('1.0')
    .addTag('sync')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3333);

  ServerConsole();
  SwaggerConsole();
}
bootstrap();
