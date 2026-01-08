import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import type { UserRole } from '@hockey-club/types'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  async function login(email: string, password: string): Promise<void> {
    await authStore.login(email, password)
    const redirectPath = authStore.isAdmin ? '/admin/dashboard' : '/athlete/dashboard'
    await router.push(redirectPath)
  }

  async function logout(): Promise<void> {
    await authStore.logout()
    await router.push('/login')
  }

  function hasRole(role: UserRole): boolean {
    return authStore.hasRole(role)
  }

  function canAccess(resource: string): boolean {
    if (authStore.isAdmin) return true

    const athleteResources = [
      'events:view',
      'attendance:view-own',
      'debts:view-own',
      'financial:view-summary',
    ]

    return athleteResources.includes(resource)
  }

  return {
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isLoading: computed(() => authStore.isLoading),
    error: computed(() => authStore.error),
    isAdmin: computed(() => authStore.isAdmin),
    isAthlete: computed(() => authStore.isAthlete),
    fullName: computed(() => authStore.fullName),
    userRole: computed(() => authStore.userRole),
    login,
    logout,
    hasRole,
    canAccess,
    clearError: authStore.clearError,
  }
}
