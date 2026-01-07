import { useLoadingStore } from '@/stores'

/**
 * Loading State Composable
 * 
 * Provides a clean interface for managing loading states
 * throughout the application.
 */
export function useLoading() {
  const loadingStore = useLoadingStore()

  /**
   * Execute an async function with automatic loading state management
   * 
   * @param taskId - Unique identifier for the task
   * @param fn - Async function to execute
   * @param message - Optional loading message
   * @returns Result of the async function
   */
  async function withLoading<T>(
    taskId: string,
    fn: () => Promise<T>,
    message?: string
  ): Promise<T> {
    loadingStore.startLoading(taskId, message)
    
    try {
      const result = await fn()
      return result
    } finally {
      loadingStore.stopLoading(taskId)
    }
  }

  return {
    // State
    isLoading: loadingStore.isLoading,
    loadingMessage: loadingStore.loadingMessage,

    // Actions
    startLoading: loadingStore.startLoading,
    stopLoading: loadingStore.stopLoading,
    stopAllLoading: loadingStore.stopAllLoading,
    showSupabaseReactivation: loadingStore.showSupabaseReactivation,
    withLoading,
  }
}
