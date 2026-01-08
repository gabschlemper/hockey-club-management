<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables'
import { designTokens } from '@/lib/design-tokens'

const { login, isLoading, error, clearError } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')

const isFormValid = computed(() => {
  return email.value && password.value && !emailError.value && !passwordError.value
})

function validateEmail(): void {
  if (!email.value) {
    emailError.value = 'Email é obrigatório'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Email inválido'
    return
  }

  emailError.value = ''
}

function validatePassword(): void {
  if (!password.value) {
    passwordError.value = 'Senha é obrigatória'
    return
  }

  if (password.value.length < 6) {
    passwordError.value = 'Senha deve ter pelo menos 6 caracteres'
    return
  }

  passwordError.value = ''
}

async function handleSubmit(): Promise<void> {
  clearError()
  emailError.value = ''
  passwordError.value = ''

  validateEmail()
  validatePassword()

  if (!isFormValid.value) return

  try {
    await login(email.value, password.value)
  } catch (err) {
    console.error('Login failed:', err)
  }
}

function clearFieldError(field: 'email' | 'password'): void {
  if (field === 'email') {
    emailError.value = ''
  } else {
    passwordError.value = ''
  }
  clearError()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="w-full max-w-md">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div 
          class="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
          :style="{ backgroundColor: designTokens.colors.primary.DEFAULT }"
        >
          <span class="text-3xl font-bold text-white">🏑</span>
        </div>
        <h1 class="text-3xl font-bold text-foreground mb-2">
          Hockey Club
        </h1>
        <p class="text-muted-foreground">
          Sistema de Gestão
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-card border border-border rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-card-foreground mb-6">
          Login
        </h2>

        <!-- Error Alert -->
        <div 
          v-if="error" 
          class="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20"
        >
          <p class="text-sm text-destructive">
            {{ error }}
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label 
              for="email" 
              class="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="seu@email.com"
              @blur="validateEmail"
              @input="clearFieldError('email')"
              :class="[
                'w-full px-4 py-2 rounded-md border transition-colors',
                'bg-background text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                emailError 
                  ? 'border-destructive focus:ring-destructive' 
                  : 'border-input focus:ring-primary'
              ]"
            />
            <p v-if="emailError" class="mt-1 text-sm text-destructive">
              {{ emailError }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label 
              for="password" 
              class="block text-sm font-medium text-foreground mb-2"
            >
              Senha
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                @blur="validatePassword"
                @input="clearFieldError('password')"
                :class="[
                  'w-full px-4 py-2 rounded-md border transition-colors',
                  'bg-background text-foreground placeholder:text-muted-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  passwordError 
                    ? 'border-destructive focus:ring-destructive' 
                    : 'border-input focus:ring-primary'
                ]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-destructive">
              {{ passwordError }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            :class="[
              'w-full py-3 px-4 rounded-md font-medium text-primary-foreground',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
              isFormValid && !isLoading
                ? 'bg-primary hover:opacity-90 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            ]"
          >
            <span v-if="isLoading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>

        <!-- Test Accounts Info -->
        <div class="mt-8 pt-6 border-t border-border">
          <p class="text-sm text-muted-foreground mb-3">
            Contas de teste:
          </p>
          <div class="space-y-2 text-sm">
            <div class="p-3 rounded-md bg-accent/50">
              <p class="font-medium text-accent-foreground">Admin</p>
              <p class="text-xs text-muted-foreground mt-1">
                admin@hockeyclub.com
              </p>
            </div>
            <div class="p-3 rounded-md bg-accent/50">
              <p class="font-medium text-accent-foreground">Atleta</p>
              <p class="text-xs text-muted-foreground mt-1">
                athlete@hockeyclub.com
              </p>
            </div>
            <p class="text-xs text-muted-foreground mt-2">
              Qualquer senha com 6+ caracteres
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-muted-foreground mt-8">
        © 2026 Hockey Club Management. Fase 1 - MVP
      </p>
    </div>
  </div>
</template>
