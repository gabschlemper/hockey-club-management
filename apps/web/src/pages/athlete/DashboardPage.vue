<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AthleteLayout from '@/layouts/AthleteLayout.vue'
import { useAuth } from '@/composables'
import { designTokens } from '@/lib/design-tokens'

const { fullName } = useAuth()

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

</script>

<template>
  <AthleteLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-foreground mb-2">
          Olá, {{ fullName }}! 🏑
        </h1>
        <p class="text-muted-foreground">
          Acompanhe suas atividades no clube
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">📅</span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ athleteStats.upcomingEvents }}</p>
          <p class="text-sm text-muted-foreground mt-1">Próximos Eventos</p>
        </div>

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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        </div>

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
    </div>
  </AthleteLayout>
</template>
