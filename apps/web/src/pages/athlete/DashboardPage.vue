<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AthleteLayout from '@/layouts/AthleteLayout.vue'
import { useAuth } from '@/composables'
import { designTokens } from '@/lib/design-tokens'

/**
 * Athlete Dashboard Page
 * 
 * Main dashboard for athletes showing:
 * - Personal stats
 * - Upcoming events
 * - Debt status
 * - Quick info
 * 
 * Limited view compared to admin dashboard
 */

const { fullName } = useAuth()

// Mock data for Phase 1
const athleteStats = ref({
  attendanceRate: 85,
  upcomingEvents: 2,
  pendingDebts: 1,
  totalDebtAmount: 150,
})

const upcomingEvents = ref([
  { id: 1, title: 'Treino Tático', date: '2026-01-10', time: '19:00', icon: '🏑' },
  { id: 2, title: 'Jogo Amistoso', date: '2026-01-12', time: '15:00', icon: '⚔️' },
])

const recentActivity = ref([
  { id: 1, text: 'Presença confirmada - Treino', date: '2026-01-05', icon: '✅' },
  { id: 2, text: 'Mensalidade paga', date: '2026-01-03', icon: '💳' },
])

onMounted(() => {
  console.log('Athlete Dashboard mounted')
})
</script>

<template>
  <AthleteLayout>
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div>
        <h1 class="text-3xl font-bold text-foreground mb-2">
          Olá, {{ fullName }}! 🏑
        </h1>
        <p class="text-muted-foreground">
          Acompanhe suas atividades no clube
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Attendance Rate -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">📊</span>
            <span 
              class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
            >
              Excelente
            </span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ athleteStats.attendanceRate }}%</p>
          <p class="text-sm text-muted-foreground mt-1">Taxa de Presença</p>
        </div>

        <!-- Upcoming Events -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">📅</span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ athleteStats.upcomingEvents }}</p>
          <p class="text-sm text-muted-foreground mt-1">Próximos Eventos</p>
        </div>

        <!-- Pending Debts Count -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">💳</span>
            <span 
              v-if="athleteStats.pendingDebts > 0"
              class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
            >
              Pendente
            </span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ athleteStats.pendingDebts }}</p>
          <p class="text-sm text-muted-foreground mt-1">Dívidas Abertas</p>
        </div>

        <!-- Total Debt Amount -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">💰</span>
          </div>
          <p class="text-3xl font-bold text-foreground">
            R$ {{ athleteStats.totalDebtAmount.toFixed(2) }}
          </p>
          <p class="text-sm text-muted-foreground mt-1">Total a Pagar</p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Upcoming Events -->
        <div class="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-foreground mb-4">
            Próximos Eventos
          </h2>
          <div class="space-y-3">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="flex items-center gap-4 p-4 rounded-md border border-border hover:bg-accent/50 transition-colors"
            >
              <span class="text-3xl">{{ event.icon }}</span>
              <div class="flex-1">
                <p class="font-medium text-foreground">{{ event.title }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ new Date(event.date).toLocaleDateString('pt-BR') }} às {{ event.time }}
                </p>
              </div>
              <button 
                class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                :style="{
                  backgroundColor: designTokens.colors.primary.DEFAULT,
                  color: designTokens.colors.primary.foreground
                }"
                disabled
              >
                Ver Detalhes
              </button>
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-4 text-center">
            Detalhes disponíveis na Fase 2
          </p>
        </div>

        <!-- Recent Activity -->
        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-foreground mb-4">
            Atividade Recente
          </h2>
          <div class="space-y-3">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-start gap-3 p-3 rounded-md bg-muted/50"
            >
              <span class="text-xl">{{ activity.icon }}</span>
              <div class="flex-1">
                <p class="text-sm font-medium text-foreground">{{ activity.text }}</p>
                <p class="text-xs text-muted-foreground mt-1">
                  {{ new Date(activity.date).toLocaleDateString('pt-BR') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Summary (Club-wide) -->
      <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>📈</span>
          Saúde Financeira do Clube
        </h2>
        <p class="text-sm text-muted-foreground mb-4">
          Transparência sobre as finanças do clube (sem dados individuais)
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-md bg-green-50 border border-green-200">
            <p class="text-sm text-green-700 font-medium mb-1">Receitas</p>
            <p class="text-2xl font-bold text-green-900">R$ 15.000</p>
          </div>
          <div class="p-4 rounded-md bg-red-50 border border-red-200">
            <p class="text-sm text-red-700 font-medium mb-1">Despesas</p>
            <p class="text-2xl font-bold text-red-900">R$ 8.500</p>
          </div>
          <div class="p-4 rounded-md bg-blue-50 border border-blue-200">
            <p class="text-sm text-blue-700 font-medium mb-1">Saldo</p>
            <p class="text-2xl font-bold text-blue-900">R$ 6.500</p>
          </div>
        </div>
        <p class="text-xs text-muted-foreground mt-4 text-center">
          Dados de exemplo - Fase 2 terá dados reais
        </p>
      </div>

      <!-- Info Banner -->
      <div 
        class="border-2 rounded-lg p-6"
        :style="{ 
          borderColor: designTokens.colors.primary.DEFAULT,
          backgroundColor: designTokens.colors.primary.DEFAULT + '10'
        }"
      >
        <div class="flex items-start gap-4">
          <span class="text-3xl">💡</span>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-foreground mb-2">
              Sistema em Desenvolvimento
            </h3>
            <p class="text-sm text-muted-foreground">
              Esta é a Fase 1 (MVP). Em breve você poderá visualizar detalhes completos de eventos, 
              seu histórico de presenças, gerenciar suas dívidas e muito mais!
            </p>
          </div>
        </div>
      </div>
    </div>
  </AthleteLayout>
</template>
