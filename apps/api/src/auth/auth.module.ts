import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

/**
 * Auth Module
 * 
 * Provides authentication functionality:
 * - Login/logout
 * - Token management
 * - User session
 * 
 * Phase 1: Mock authentication
 * Phase 2: Supabase integration
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Export for use in other modules (guards, etc.)
})
export class AuthModule {}
