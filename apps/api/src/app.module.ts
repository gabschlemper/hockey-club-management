import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

/**
 * App Module
 * 
 * Root module of the application.
 * Imports all feature modules following Clean Architecture.
 * 
 * Organization:
 * - Core modules (config, database)
 * - Feature modules (auth, users, events, etc.)
 * - Shared modules (common utilities)
 */
@Module({
  imports: [
    // Global configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Feature modules (Phase 2)
    // AuthModule,
    // UsersModule,
    // EventsModule,
    // AttendanceModule,
    // DebtsModule,
    // FinancialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
