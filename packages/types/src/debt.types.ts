/**
 * Debt status
 */
export enum DebtStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

/**
 * Debt entity for tracking athlete financial obligations
 */
export interface Debt {
  id: string
  athleteId: string
  amount: number
  description: string
  dueDate: Date
  status: DebtStatus
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Create debt DTO
 */
export interface CreateDebtDto {
  athleteId: string
  amount: number
  description: string
  dueDate: Date
}

/**
 * Bulk create debts DTO (for monthly fees, etc.)
 */
export interface BulkCreateDebtsDto {
  athleteIds: string[]
  amount: number
  description: string
  dueDate: Date
}

/**
 * Payment record
 */
export interface Payment {
  id: string
  debtId: string
  amountPaid: number
  paymentDate: Date
  paymentMethod?: string
  notes?: string
}

/**
 * Register payment DTO
 */
export interface RegisterPaymentDto {
  debtId: string
  amountPaid: number
  paymentDate: Date
  paymentMethod?: string
  notes?: string
}
