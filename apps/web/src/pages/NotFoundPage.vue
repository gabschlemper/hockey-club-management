<script setup lang="ts">
/**
 * 404 Not Found Page
 * 
 * Displayed when user navigates to non-existent route
 */

import { useRouter } from 'vue-router'
import { useAuth } from '@/composables'

const router = useRouter()
const { isAuthenticated, isAdmin } = useAuth()

function goHome(): void {
  if (!isAuthenticated) {
    router.push('/login')
    return
  }

  const path = isAdmin ? '/admin/dashboard' : '/athlete/dashboard'
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="text-center">
      <div class="mb-8">
        <span class="text-8xl">🏑</span>
      </div>
      <h1 class="text-6xl font-bold text-foreground mb-4">404</h1>
      <p class="text-xl text-muted-foreground mb-8">
        Página não encontrada
      </p>
      <button
        @click="goHome"
        class="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Voltar para o início
      </button>
    </div>
  </div>
</template>
