import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// Import global styles
import '@/assets/styles/main.css'

/**
 * Application Entry Point
 * 
 * Initializes:
 * - Vue app instance
 * - Pinia store with persistence
 * - Vue Router
 * - Global error handling
 */

// Create Vue app
const app = createApp(App)

// Create and configure Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Use plugins
app.use(pinia)
app.use(router)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Error info:', info)
  console.error('Component:', instance)
  
  // In production, send to error tracking service (e.g., Sentry)
  // For Phase 1, just log to console
}

// Global warning handler (development only)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue warning:', msg)
    console.warn('Trace:', trace)
  }
}

// Mount app
app.mount('#app')

// Log app initialization
console.log('🏑 Hockey Club Management System - Phase 1')
console.log('Environment:', import.meta.env.MODE)
console.log('API URL:', import.meta.env.VITE_API_URL)
