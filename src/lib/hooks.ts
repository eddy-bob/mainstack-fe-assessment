import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  fetchUser,
  fetchWallet,
  fetchTransactions,
  fetchFinancialMetrics,
  fetchLegacyTransactions,
  fetchChartData,
} from "./api";
import type {
  User,
  Wallet,
  Transaction,
  FinancialMetrics,
  ChartDataPoint,
  LegacyTransaction,
} from "@/types";

// Query keys for consistent caching
export const queryKeys = {
  user: ["user"] as const,
  wallet: ["wallet"] as const,
  transactions: ["transactions"] as const,
  financialMetrics: ["financialMetrics"] as const,
  legacyTransactions: ["legacyTransactions"] as const,
  chartData: ["chartData"] as const,
} as const;

// User hooks
export function useUser(): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Wallet hooks
export function useWallet(): UseQueryResult<Wallet, Error> {
  return useQuery({
    queryKey: queryKeys.wallet,
    queryFn: fetchWallet,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Transactions hooks
export function useTransactions(): UseQueryResult<Transaction[], Error> {
  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: fetchTransactions,
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Financial metrics hooks (converted from wallet)
export function useFinancialMetrics(): UseQueryResult<FinancialMetrics, Error> {
  return useQuery({
    queryKey: queryKeys.financialMetrics,
    queryFn: fetchFinancialMetrics,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Legacy transactions hooks (for backward compatibility)
export function useLegacyTransactions(): UseQueryResult<
  LegacyTransaction[],
  Error
> {
  return useQuery({
    queryKey: queryKeys.legacyTransactions,
    queryFn: fetchLegacyTransactions,
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Chart data hooks
export function useChartData(): UseQueryResult<ChartDataPoint[], Error> {
  return useQuery({
    queryKey: queryKeys.chartData,
    queryFn: fetchChartData,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Combined hooks for common use cases
export function useRevenueData() {
  const user = useUser();
  const wallet = useWallet();
  const transactions = useTransactions();
  const chartData = useChartData();

  return {
    user,
    wallet,
    transactions,
    chartData,
    isLoading:
      user.isLoading ||
      wallet.isLoading ||
      transactions.isLoading ||
      chartData.isLoading,
    isError:
      user.isError ||
      wallet.isError ||
      transactions.isError ||
      chartData.isError,
    error: user.error || wallet.error || transactions.error || chartData.error,
  };
}

// Hook for transaction statistics
export function useTransactionStats() {
  const { data: transactions, isLoading, isError, error } = useTransactions();

  const stats = transactions
    ? {
        totalTransactions: transactions.length,
        totalDeposits: transactions.filter((t) => t.type === "deposit").length,
        totalWithdrawals: transactions.filter((t) => t.type === "withdrawal")
          .length,
        successfulTransactions: transactions.filter(
          (t) => t.status === "successful"
        ).length,
        pendingTransactions: transactions.filter((t) => t.status === "pending")
          .length,
        failedTransactions: transactions.filter((t) => t.status === "failed")
          .length,
        totalDepositAmount: transactions
          .filter((t) => t.type === "deposit" && t.status === "successful")
          .reduce((sum, t) => sum + t.amount, 0),
        totalWithdrawalAmount: transactions
          .filter((t) => t.type === "withdrawal" && t.status === "successful")
          .reduce((sum, t) => sum + t.amount, 0),
      }
    : null;

  return {
    stats,
    isLoading,
    isError,
    error,
  };
}
