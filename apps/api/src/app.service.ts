import { Injectable } from '@nestjs/common'

/**
 * App Service
 * 
 * Root service for application-level operations
 */
@Injectable()
export class AppService {
  /**
   * Get API health status
   */
  getHealth(): Record<string, unknown> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    }
  }

  /**
   * Get API version info
   */
  getVersion(): Record<string, unknown> {
    return {
      version: '1.0.0',
      phase: 'Phase 1 - MVP',
      features: {
        authentication: 'planned',
        events: 'phase-2',
        attendance: 'phase-2',
        debts: 'phase-2',
        financial: 'phase-2',
      },
    }
  }
}
