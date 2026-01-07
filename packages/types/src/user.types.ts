/**
 * User Roles in the system
 * 
 * Admin: Full access to manage club operations
 * Athlete: Limited access to personal data and club information
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  ATHLETE = 'ATHLETE',
}

/**
 * User entity representing both admins and athletes
 */
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Extended profile for athletes
 */
export interface AthleteProfile {
  userId: string
  phoneNumber?: string
  dateOfBirth?: Date
  emergencyContact?: string
  notes?: string
}

/**
 * Authentication credentials
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Authentication response with user data and token
 */
export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken?: string
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string
}

/**
 * Account activation
 */
export interface AccountActivation {
  token: string
  password: string
  passwordConfirmation: string
}
