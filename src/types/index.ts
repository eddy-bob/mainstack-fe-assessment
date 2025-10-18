// User API Types
export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

// Wallet API Types
export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

// Transaction API Types
export interface TransactionMetadata {
  name: string;
  type: string;
  email: string;
  quantity: number;
  country: string;
  product_name?: string;
}

export interface Transaction {
  amount: number;
  metadata?: TransactionMetadata;
  payment_reference: string;
  status: "successful" | "pending" | "failed";
  type: "deposit" | "withdrawal";
  date: string;
}

// Legacy types for backward compatibility
export interface LegacyTransaction {
  id: string;
  title: string;
  author: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface FinancialMetrics {
  availableBalance: number;
  ledgerBalance: number;
  totalPayout: number;
  totalRevenue: number;
  pendingPayout: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
