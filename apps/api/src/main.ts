import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

/**
 * Application Bootstrap
 * 
 * Initializes the NestJS application with:
 * - Global validation pipe
 * - CORS configuration
 * - Swagger API documentation
 * - Global prefix
 * 
 * Following Clean Architecture:
 * - Main entry point is thin
 * - Configuration driven by environment
 * - Middleware and interceptors configured globally
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  })

  const configService = app.get(ConfigService)

  // Global validation pipe with transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw error on extra properties
      transform: true, // Transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  // CORS configuration
  const corsOrigin = configService.get<string>('CORS_ORIGIN')
  app.enableCors({
    origin: corsOrigin?.split(',') || 'http://localhost:3000',
    credentials: true,
  })

  // Global API prefix
  const apiPrefix = configService.get<string>('API_PREFIX') || 'api'
  app.setGlobalPrefix(apiPrefix)

  // Swagger API Documentation
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Hockey Club Management API')
      .setDescription('API for managing hockey club operations')
      .setVersion('1.0')
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management')
      .addTag('events', 'Event management (Phase 2)')
      .addTag('attendance', 'Attendance tracking (Phase 2)')
      .addTag('debts', 'Debt management (Phase 2)')
      .addTag('financial', 'Financial records (Phase 2)')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document)
  }

  // Start server
  const port = configService.get<number>('PORT') || 4000
  await app.listen(port)

  console.log(`🏑 Hockey Club API running on: http://localhost:${port}`)
  console.log(`📚 Swagger docs: http://localhost:${port}/${apiPrefix}/docs`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
}

bootstrap()
