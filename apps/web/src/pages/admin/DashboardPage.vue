<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAuth } from '@/composables'
import { designTokens } from '@/lib/design-tokens'

const { fullName } = useAuth()

const stats = ref({
  totalAthletes: 24,
  upcomingEvents: 3,
  pendingDebts: 8,
  monthlyRevenue: 12500,
})


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
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-foreground mb-2">
          Bem-vindo, {{ fullName }}! 👋
        </h1>
        <p class="text-muted-foreground">
          Gerencie seu clube de hóquei de forma eficiente
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <div class="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">📅</span>
          </div>
          <p class="text-3xl font-bold text-foreground">{{ stats.upcomingEvents }}</p>
          <p class="text-sm text-muted-foreground mt-1">Eventos Próximos</p>
        </div>

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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
