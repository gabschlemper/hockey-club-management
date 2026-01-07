<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables'
import { designTokens } from '@/lib/design-tokens'

/**
 * Athlete Layout Component
 * 
 * Main layout for athlete users with:
 * - Simplified sidebar navigation
 * - Header with user info and logout
 * - Content area
 * 
 * More restricted than admin layout
 */

const { fullName, logout } = useAuth()
const isSidebarOpen = ref(true)

/**
 * Navigation items for athlete
 * Phase 2 will add: Events, Attendance, Debts, Profile
 */
const navigationItems = [
  {
    label: 'Dashboard',
    icon: '🏠',
    route: '/athlete/dashboard',
    active: true,
  },
  // Phase 2 items:
  // { label: 'Eventos', icon: '📅', route: '/athlete/events' },
  // { label: 'Minhas Presenças', icon: '✓', route: '/athlete/attendance' },
  // { label: 'Minhas Dívidas', icon: '💳', route: '/athlete/debts' },
  // { label: 'Meu Perfil', icon: '👤', route: '/athlete/profile' },
]

function toggleSidebar(): void {
  isSidebarOpen.value = !isSidebarOpen.value
}

async function handleLogout(): Promise<void> {
  await logout()
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-card border-r border-border',
        'transition-all duration-300 ease-in-out z-40',
        isSidebarOpen ? 'w-64' : 'w-20'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between p-4 border-b border-border">
        <div class="flex items-center gap-3">
          <div 
            class="flex h-10 w-10 items-center justify-center rounded-md"
            :style="{ backgroundColor: designTokens.colors.primary.DEFAULT }"
          >
            <span class="text-xl">🏑</span>
          </div>
          <div v-show="isSidebarOpen" class="overflow-hidden">
            <h1 class="text-lg font-bold whitespace-nowrap">Hockey Club</h1>
            <p class="text-xs text-muted-foreground whitespace-nowrap">Área do Atleta</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <router-link
          v-for="item in navigationItems"
          :key="item.route"
          :to="item.route"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
            'hover:bg-accent',
            item.active ? 'bg-primary text-primary-foreground' : 'text-foreground'
          ]"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span v-show="isSidebarOpen" class="font-medium whitespace-nowrap">
            {{ item.label }}
          </span>
        </router-link>
      </nav>

      <!-- Help Info -->
      <div v-show="isSidebarOpen" class="absolute bottom-4 left-4 right-4">
        <div class="p-3 rounded-md bg-muted">
          <p class="text-xs text-muted-foreground">
            💡 Dúvidas? Entre em contato com a diretoria
          </p>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div
      :class="[
        'transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'ml-64' : 'ml-20'
      ]"
    >
      <!-- Header -->
      <header class="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
        <div class="flex items-center justify-between px-6 py-4">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle sidebar"
          >
            <span class="text-xl">{{ isSidebarOpen ? '◀' : '▶' }}</span>
          </button>

          <div class="flex items-center gap-4">
            <!-- User Info -->
            <div class="text-right">
              <p class="text-sm font-medium text-foreground">{{ fullName }}</p>
              <p class="text-xs text-muted-foreground">Atleta</p>
            </div>

            <!-- Logout Button -->
            <button
              @click="handleLogout"
              class="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
