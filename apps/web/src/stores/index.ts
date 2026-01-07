/**
 * Pinia Stores Index
 * 
 * Central export point for all Pinia stores.
 * Organized by feature following Clean Architecture principles.
 */

export { useAuthStore } from './auth.store'
export { useLoadingStore } from './loading.store'

// Future stores (Phase 2):
// export { useEventsStore } from './events.store'
// export { useAttendanceStore } from './attendance.store'
// export { useDebtsStore } from './debts.store'
// export { useFinancialStore } from './financial.store'
