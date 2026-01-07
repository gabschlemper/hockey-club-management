/**
 * Transaction type for club finances
 */
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

/**
 * Financial record for club-wide transactions
 */
export interface FinancialRecord {
  id: string
  transactionType: TransactionType
  amount: number
  category: string
  description: string
  transactionDate: Date
  createdBy: string
  createdAt: Date
}

/**
 * Create financial record DTO
 */
export interface CreateFinancialRecordDto {
  transactionType: TransactionType
  amount: number
  category: string
  description: string
  transactionDate: Date
}

/**
 * Financial summary for dashboard
 */
export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  balance: number
  period: {
    startDate: Date
    endDate: Date
  }
}

/**
 * Financial dashboard data
 */
export interface FinancialDashboard {
  summary: FinancialSummary
  recentTransactions: FinancialRecord[]
  categoryBreakdown: {
    category: string
    amount: number
    percentage: number
  }[]
}
