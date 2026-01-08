import { Injectable, UnauthorizedException } from '@nestjs/common'
import type { User, UserRole } from '@hockey-club/types'
import { LoginDto, AuthResponseDto } from './dto'

@Injectable()
export class AuthService {
  private readonly mockUsers: Record<string, User & { password: string }> = {
    'admin@hockeyclub.com': {
      id: '1',
      email: 'admin@hockeyclub.com',
      firstName: 'João',
      lastName: 'Silva',
      role: 'ADMIN' as UserRole,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
      password: 'admin123',
    },
    'athlete@hockeyclub.com': {
      id: '2',
      email: 'athlete@hockeyclub.com',
      firstName: 'Maria',
      lastName: 'Santos',
      role: 'ATHLETE' as UserRole,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      password: 'athlete123',
    },
    'athlete2@hockeyclub.com': {
      id: '3',
      email: 'athlete2@hockeyclub.com',
      firstName: 'Pedro',
      lastName: 'Oliveira',
      role: 'ATHLETE' as UserRole,
      isActive: true,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date(),
      password: 'athlete123',
    },
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto

    await this.delay(500)

    const user = this.mockUsers[email.toLowerCase()]
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Conta desativada')
    }

    const accessToken = this.generateMockToken(user)
    const { password: _, ...userWithoutPassword } = user

    return {
      accessToken,
      user: userWithoutPassword,
    }
  }

  private generateMockToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }

    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64')
    const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64')
    const signature = Buffer.from('mock-signature-' + user.id).toString('base64')

    return `${header}.${payloadStr}.${signature}`
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
