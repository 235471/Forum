import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Create Swagger documentation options
  const config = new DocumentBuilder()
    .setTitle('Forum API')
    .setDescription(
      'A Forum API developed with NestJS, DDD, Clean Architecture and SOLID principles',
    )
    .setVersion('0.0.1')
    .addTag('forum')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  await app.listen(port)
}
bootstrap()
