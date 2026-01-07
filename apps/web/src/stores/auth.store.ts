import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRole } from '@hockey-club/types'

/**
 * Authentication Store
 * 
 * Manages user authentication state, login/logout operations,
 * and session persistence.
 * 
 * Following Clean Architecture:
 * - State management (Application Layer)
 * - Business rules for authentication
 * - No UI logic here
 */
export const useAuthStore = defineStore(
  'auth',
  () => {
    // State
    const user = ref<User | null>(null)
    const accessToken = ref<string | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Getters (Computed)
    const isAuthenticated = computed(() => !!user.value && !!accessToken.value)
    const userRole = computed(() => user.value?.role ?? null)
    const isAdmin = computed(() => userRole.value === 'ADMIN')
    const isAthlete = computed(() => userRole.value === 'ATHLETE')
    const fullName = computed(() => {
      if (!user.value) return ''
      return `${user.value.firstName} ${user.value.lastName}`
    })

    // Actions
    
    /**
     * Login user with credentials
     * In Phase 1, this uses mock data
     * In Phase 2, this will call the real API
     */
    async function login(email: string, password: string): Promise<void> {
      isLoading.value = true
      error.value = null

      try {
        // TODO Phase 2: Replace with real API call
        // const response = await authService.login({ email, password })
        
        // Mock authentication for Phase 1
        const mockUser = await mockLogin(email, password)
        
        user.value = mockUser
        accessToken.value = 'mock-jwt-token-' + Date.now()
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Login failed'
        throw err
      } finally {
        isLoading.value = false
      }
    }

    /**
     * Logout user and clear session
     */
    function logout(): void {
      user.value = null
      accessToken.value = null
      error.value = null
    }

    /**
     * Update user data
     */
    function setUser(newUser: User): void {
      user.value = newUser
    }

    /**
     * Update access token
     */
    function setAccessToken(token: string): void {
      accessToken.value = token
    }

    /**
     * Clear error state
     */
    function clearError(): void {
      error.value = null
    }

    /**
     * Check if user has a specific role
     */
    function hasRole(role: UserRole): boolean {
      return userRole.value === role
    }

    /**
     * Restore session from storage (called on app init)
     * This is handled by pinia-plugin-persistedstate
     */
    function initializeAuth(): void {
      // If user data exists in persisted state, it's automatically loaded
      // Additional initialization logic can go here
      if (user.value) {
        console.log('Session restored for:', fullName.value)
      }
    }

    return {
      // State
      user,
      accessToken,
      isLoading,
      error,
      
      // Getters
      isAuthenticated,
      userRole,
      isAdmin,
      isAthlete,
      fullName,
      
      // Actions
      login,
      logout,
      setUser,
      setAccessToken,
      clearError,
      hasRole,
      initializeAuth,
    }
  },
  {
    // Persist auth state to localStorage
    persist: {
      storage: localStorage,
      paths: ['user', 'accessToken'],
    },
  }
)

/**
 * Mock login function for Phase 1 development
 * Returns predefined users based on email
 * 
 * Available test accounts:
 * - admin@hockeyclub.com (Admin)
 * - athlete@hockeyclub.com (Athlete)
 */
async function mockLogin(email: string, password: string): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Mock validation
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios')
  }

  if (password.length < 6) {
    throw new Error('Senha deve ter pelo menos 6 caracteres')
  }

  // Mock users database
  const mockUsers: Record<string, User> = {
    'admin@hockeyclub.com': {
      id: '1',
      email: 'admin@hockeyclub.com',
      firstName: 'João',
      lastName: 'Silva',
      role: 'ADMIN' as UserRole,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
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
    },
  }

  const user = mockUsers[email]

  if (!user) {
    throw new Error('Email ou senha inválidos')
  }

  // In a real scenario, we would validate password hash
  // For mock, accept any password length >= 6
  
  return user
}
