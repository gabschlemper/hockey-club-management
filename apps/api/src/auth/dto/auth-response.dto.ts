import { ApiProperty } from '@nestjs/swagger'
import type { UserRole } from '@hockey-club/types'

export class UserDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  email: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty({ enum: ['ADMIN', 'ATHLETE'] })
  role: UserRole

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  user: UserDto
}
