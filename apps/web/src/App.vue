<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore, useLoadingStore } from '@/stores'

/**
 * App Root Component
 * 
 * Main application wrapper with:
 * - Global loading overlay
 * - Router view for page rendering
 * - Store initialization
 */

const authStore = useAuthStore()
const loadingStore = useLoadingStore()

onMounted(() => {
  // Initialize auth store (restores session from localStorage if exists)
  authStore.initializeAuth()
})
</script>

<template>
  <div id="app">
    <!-- Global Loading Overlay -->
    <Transition name="fade">
      <div 
        v-if="loadingStore.isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div class="bg-card border border-border rounded-lg p-8 shadow-xl max-w-md mx-4">
          <div class="flex flex-col items-center gap-4">
            <!-- Loading Spinner -->
            <div class="relative">
              <div class="h-16 w-16 rounded-full border-4 border-border"></div>
              <div class="absolute top-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            
            <!-- Loading Message -->
            <div class="text-center">
              <p class="text-lg font-semibold text-foreground mb-1">
                Carregando...
              </p>
              <p 
                v-if="loadingStore.loadingMessage" 
                class="text-sm text-muted-foreground"
              >
                {{ loadingStore.loadingMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Router View -->
    <RouterView />
  </div>
</template>

<style scoped>
/* Fade transition for loading overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Spin animation for loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
