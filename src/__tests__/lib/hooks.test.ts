import React from "react";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTransactions, useTransactionStats } from "@/lib/hooks";

// Mock the API functions
jest.mock("@/lib/api", () => ({
  fetchTransactions: jest.fn(),
  fetchUser: jest.fn(),
  fetchWallet: jest.fn(),
  fetchFinancialMetrics: jest.fn(),
  fetchLegacyTransactions: jest.fn(),
  fetchChartData: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
};

describe("useTransactions Hook", () => {
  it("should return loading state initially", () => {
    const { result } = renderHook(() => useTransactions(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(false);
  });
});

describe("useTransactionStats Hook", () => {
  it("should return loading state initially", () => {
    const { result } = renderHook(() => useTransactionStats(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.stats).toBeNull();
    expect(result.current.isError).toBe(false);
  });
});
