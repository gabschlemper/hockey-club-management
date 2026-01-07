import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Loading Store
 * 
 * Global loading state management.
 * Centralized control for showing loading indicators across the app.
 * 
 * Use cases:
 * - API requests
 * - Navigation transitions
 * - Data processing
 * - Supabase reactivation after pause
 */
export const useLoadingStore = defineStore('loading', () => {
  // State
  const isLoading = ref(false)
  const loadingMessage = ref<string>('')
  const loadingTasks = ref(new Set<string>())

  // Actions
  
  /**
   * Start a loading task
   * @param taskId - Unique identifier for the task
   * @param message - Optional message to display
   */
  function startLoading(taskId: string, message?: string): void {
    loadingTasks.value.add(taskId)
    isLoading.value = true
    
    if (message) {
      loadingMessage.value = message
    }
  }

  /**
   * Stop a loading task
   * @param taskId - Unique identifier for the task
   */
  function stopLoading(taskId: string): void {
    loadingTasks.value.delete(taskId)
    
    if (loadingTasks.value.size === 0) {
      isLoading.value = false
      loadingMessage.value = ''
    }
  }

  /**
   * Stop all loading tasks immediately
   */
  function stopAllLoading(): void {
    loadingTasks.value.clear()
    isLoading.value = false
    loadingMessage.value = ''
  }

  /**
   * Show loading for Supabase reactivation
   * Called when first request after pause times out
   */
  function showSupabaseReactivation(): void {
    startLoading('supabase-reactivation', 'Reativando sistema, aguarde 30 segundos...')
  }

  return {
    // State
    isLoading,
    loadingMessage,
    
    // Actions
    startLoading,
    stopLoading,
    stopAllLoading,
    showSupabaseReactivation,
  }
})
