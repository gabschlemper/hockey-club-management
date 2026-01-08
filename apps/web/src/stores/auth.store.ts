import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRole } from '@hockey-club/types'
import { authApi } from '@/services/api.service'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const accessToken = ref<string | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!user.value && !!accessToken.value)
    const userRole = computed(() => user.value?.role ?? null)
    const isAdmin = computed(() => userRole.value === 'ADMIN')
    const isAthlete = computed(() => userRole.value === 'ATHLETE')
    const fullName = computed(() => {
      if (!user.value) return ''
      return `${user.value.firstName} ${user.value.lastName}`
    })

    async function login(email: string, password: string): Promise<void> {
      isLoading.value = true
      error.value = null

      try {
        const response = await authApi.login({ email, password })
        user.value = response.user
        accessToken.value = response.accessToken
        localStorage.setItem('auth_token', response.accessToken)
      } catch (err: any) {
        error.value = err.response?.data?.message || err.message || 'Erro ao fazer login'
        throw err
      } finally {
        isLoading.value = false
      }
    }

    async function logout(): Promise<void> {
      try {
        await authApi.logout()
      } finally {
        user.value = null
        accessToken.value = null
        error.value = null
        localStorage.removeItem('auth_token')
      }
    }

    function setUser(newUser: User): void {
      user.value = newUser
    }

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
