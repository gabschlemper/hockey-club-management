<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAuth } from '@/composables'
import { designTokens } from '@/lib/design-tokens'

/**
 * Admin Dashboard Page
 * 
 * Main dashboard for administrators showing:
 * - Quick stats overview
 * - Recent activity
 * - Quick actions
 * 
 * Designed for extensibility in Phase 2
 */

const { fullName } = useAuth()

// Mock data for Phase 1
const stats = ref({
  totalAthletes: 24,
  upcomingEvents: 3,
  pendingDebts: 8,
  monthlyRevenue: 12500,
})

const recentActivity = ref([
  { id: 1, action: 'Sistema inicializado', time: 'Agora', icon: '✨' },
  { id: 2, action: 'Fase 1 concluída', time: 'Recente', icon: '✅' },
  { id: 3, action: 'Aguardando Fase 2', time: 'Em breve', icon: '🚀' },
])

const quickActions = [
  { label: 'Criar Evento', icon: '📅', action: 'createEvent', disabled: true },
  { label: 'Marcar Presença', icon: '✓', action: 'markAttendance', disabled: true },
  { label: 'Adicionar Dívida', icon: '💳', action: 'addDebt', disabled: true },
  { label: 'Ver Relatórios', icon: '📊', action: 'viewReports', disabled: true },
]

onMounted(() => {
  console.log('Admin Dashboard mounted')
})

function handleQuickAction(action: string): void {
  console.log('Quick action:', action)
  // Phase 2: Implement actual actions
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div>
        <h1 class="text-3xl font-bold text-foreground mb-2">
          Bem-vindo, {{ fullName }}! 👋
        </h1>
        <p class="text-muted-foreground">
          Gerencie seu clube de hóquei de forma eficiente
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Athletes -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">👥</span>
            <span 
              class="px-2 py-1 rounded-full text-xs font-medium"
              :style="{ 
                backgroundColor: designTokens.colors.primary.DEFAULT + '20',
                color: designTokens.colors.primary.DEFAULT 
              }"
            >
              Ativo
            </span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ stats.totalAthletes }}</p>
          <p class="text-sm text-muted-foreground mt-1">Total de Atletas</p>
        </div>

        <!-- Upcoming Events -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">📅</span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ stats.upcomingEvents }}</p>
          <p class="text-sm text-muted-foreground mt-1">Eventos Próximos</p>
        </div>

        <!-- Pending Debts -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">💳</span>
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              Pendente
            </span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ stats.pendingDebts }}</p>
          <p class="text-sm text-muted-foreground mt-1">Dívidas Abertas</p>
        </div>

        <!-- Monthly Revenue -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">💰</span>
          </div>
          <p class="text-3xl font-bold text-foreground">
            R$ {{ stats.monthlyRevenue.toLocaleString('pt-BR') }}
          </p>
          <p class="text-sm text-muted-foreground mt-1">Receita Mensal</p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-foreground mb-4">
            Atividades Recentes
          </h2>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-center gap-4 p-3 rounded-md bg-muted/50"
            >
              <span class="text-2xl">{{ activity.icon }}</span>
              <div class="flex-1">
                <p class="text-sm font-medium text-foreground">{{ activity.action }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-foreground mb-4">
            Ações Rápidas
          </h2>
          <div class="space-y-3">
            <button
              v-for="item in quickActions"
              :key="item.action"
              @click="handleQuickAction(item.action)"
              :disabled="item.disabled"
              :class="[
                'w-full flex items-center gap-3 p-3 rounded-md transition-colors text-left',
                item.disabled
                  ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  : 'bg-primary text-primary-foreground hover:opacity-90 cursor-pointer'
              ]"
            >
              <span class="text-xl">{{ item.icon }}</span>
              <span class="font-medium text-sm">{{ item.label }}</span>
            </button>
          </div>
          <p class="text-xs text-muted-foreground mt-4 text-center">
            Disponível na Fase 2
          </p>
        </div>
      </div>

      <!-- Phase 2 Info Banner -->
      <div 
        class="border-2 rounded-lg p-6"
        :style="{ 
          borderColor: designTokens.colors.primary.DEFAULT,
          backgroundColor: designTokens.colors.primary.DEFAULT + '10'
        }"
      >
        <div class="flex items-start gap-4">
          <span class="text-3xl">🚀</span>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-foreground mb-2">
              Fase 2 em Desenvolvimento
            </h3>
            <p class="text-sm text-muted-foreground mb-3">
              Funcionalidades que serão implementadas:
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-foreground">
              <li>✅ Gestão completa de eventos</li>
              <li>✅ Controle de presenças</li>
              <li>✅ Sistema financeiro individual</li>
              <li>✅ Dashboard financeiro do time</li>
              <li>✅ Upload de planilhas Excel</li>
              <li>✅ Cadastro de atletas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
