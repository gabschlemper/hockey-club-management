import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import type { UserRole } from '@hockey-club/types'

/**
 * Authentication Composable
 * 
 * Provides authentication-related functionality and state
 * to components. Encapsulates store access and common operations.
 * 
 * Following Clean Architecture:
 * - Provides a clean interface to auth functionality
 * - Hides implementation details from components
 * - Makes components more testable
 */
export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  /**
   * Login with credentials
   */
  async function login(email: string, password: string): Promise<void> {
    try {
      await authStore.login(email, password)
      
      // Navigate to appropriate dashboard based on role
      const redirectPath = authStore.isAdmin ? '/admin/dashboard' : '/athlete/dashboard'
      await router.push(redirectPath)
    } catch (error) {
      // Error is already set in store, just rethrow for component handling
      throw error
    }
  }

  /**
   * Logout and redirect to login page
   */
  async function logout(): Promise<void> {
    authStore.logout()
    await router.push('/login')
  }

  /**
   * Check if user has specific role
   */
  function hasRole(role: UserRole): boolean {
    return authStore.hasRole(role)
  }

  /**
   * Check if user has permission to access a resource
   * Extensible for future fine-grained permissions
   */
  function canAccess(resource: string): boolean {
    // Phase 1: Simple role-based check
    // Phase 2: Can be extended with more complex permission logic
    
    if (authStore.isAdmin) {
      return true // Admins have full access
    }

    // Define athlete-accessible resources
    const athleteResources = [
      'events:view',
      'attendance:view-own',
      'debts:view-own',
      'financial:view-summary',
    ]

    return athleteResources.includes(resource)
  }

  return {
    // State (from store)
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    isAdmin: authStore.isAdmin,
    isAthlete: authStore.isAthlete,
    fullName: authStore.fullName,
    userRole: authStore.userRole,

    // Actions
    login,
    logout,
    hasRole,
    canAccess,
    clearError: authStore.clearError,
  }
}
