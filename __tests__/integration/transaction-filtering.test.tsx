import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransactionList } from '@/components/transaction-list'

// Mock the hooks
jest.mock('@/lib/hooks', () => ({
  useTransactions: jest.fn(),
}))

// Mock the API functions
jest.mock('@/lib/api', () => ({
  formatTransactionType: jest.fn((type: string) => type.charAt(0).toUpperCase() + type.slice(1)),
}))

const mockUseTransactions = require('@/lib/hooks').useTransactions

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('Transaction Filtering Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTransactions.mockReturnValue({
      data: [
        {
          amount: 500,
          metadata: {
            name: 'John Doe',
            type: 'digital_product',
            email: 'johndoe@example.com',
            quantity: 1,
            country: 'Nigeria',
            product_name: 'Rich Dad Poor Dad',
          },
          payment_reference: 'c3f7123f-186f-4a45-b911-76736e9c5937',
          status: 'successful',
          type: 'deposit',
          date: '2022-03-03T10:00:00Z',
        },
        {
          amount: 300,
          status: 'successful',
          type: 'withdrawal',
          date: '2022-03-01T10:00:00Z',
          payment_reference: 'ref2',
        },
        {
          amount: 200,
          metadata: {
            name: 'Ada Eze',
            type: 'webinar',
            email: 'adaeze1@example.com',
            quantity: 1,
            country: 'Nigeria',
            product_name: 'Learn how to pitch your idea',
          },
          payment_reference: '5b2988d9-395e-4a91-984b-8b02f0d12df9',
          status: 'pending',
          type: 'deposit',
          date: '2022-02-20T10:00:00Z',
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
    })
  })

  it('should filter transactions by date range', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<TransactionList />)

    // Open filter panel
    const filterButton = screen.getByText('Filter')
    await user.click(filterButton)

    // Wait for filter panel to be visible
    await waitFor(() => {
      expect(screen.getByText('Date Range')).toBeInTheDocument()
    })

    // Apply filter (simulate date range selection)
    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)

    // All transactions should be visible initially (within default date range)
    expect(screen.getByText('3 Transactions')).toBeInTheDocument()
  })

  it('should filter transactions by type', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<TransactionList />)

    // Open filter panel
    const filterButton = screen.getByText('Filter')
    await user.click(filterButton)

    // Wait for filter panel to be visible
    await waitFor(() => {
      expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    })

    // Open transaction type dropdown
    const typeButton = screen.getByRole('button', { name: /store transactions/i })
    await user.click(typeButton)

    // Select "Store Transactions" (which maps to deposits)
    const storeTransactionsCheckbox = screen.getByRole('checkbox', { name: /store transactions/i })
    await user.click(storeTransactionsCheckbox)

    // Apply filter
    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)

    // Should show only deposit transactions
    expect(screen.getByText('2 Transactions')).toBeInTheDocument()
    expect(screen.getByText('Rich Dad Poor Dad')).toBeInTheDocument()
    expect(screen.getByText('Learn how to pitch your idea')).toBeInTheDocument()
  })

  it('should filter transactions by status', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<TransactionList />)

    // Open filter panel
    const filterButton = screen.getByText('Filter')
    await user.click(filterButton)

    // Wait for filter panel to be visible
    await waitFor(() => {
      expect(screen.getByText('Transaction Status')).toBeInTheDocument()
    })

    // Open transaction status dropdown
    const statusButton = screen.getByRole('button', { name: /successful/i })
    await user.click(statusButton)

    // Select "Successful" status
    const successfulCheckbox = screen.getByRole('checkbox', { name: /successful/i })
    await user.click(successfulCheckbox)

    // Apply filter
    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)

    // Should show only successful transactions
    expect(screen.getByText('2 Transactions')).toBeInTheDocument()
    expect(screen.getByText('Rich Dad Poor Dad')).toBeInTheDocument()
    // Should not show pending transactions
    expect(screen.queryByText('Learn how to pitch your idea')).not.toBeInTheDocument()
  })

  it('should clear all filters', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<TransactionList />)

    // Open filter panel
    const filterButton = screen.getByText('Filter')
    await user.click(filterButton)

    // Wait for filter panel to be visible
    await waitFor(() => {
      expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    })

    // Apply some filters first
    const typeButton = screen.getByRole('button', { name: /store transactions/i })
    await user.click(typeButton)
    const storeTransactionsCheckbox = screen.getByRole('checkbox', { name: /store transactions/i })
    await user.click(storeTransactionsCheckbox)

    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)

    // Verify filter is applied
    expect(screen.getByText('2 Transactions')).toBeInTheDocument()

    // Open filter panel again
    await user.click(filterButton)

    // Clear filters
    const clearButton = screen.getByText('Clear')
    await user.click(clearButton)

    // Should show all transactions again
    expect(screen.getByText('3 Transactions')).toBeInTheDocument()
  })

  it('should show filter count badge', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<TransactionList />)

    // Open filter panel
    const filterButton = screen.getByText('Filter')
    await user.click(filterButton)

    // Wait for filter panel to be visible
    await waitFor(() => {
      expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    })

    // Select a filter
    const typeButton = screen.getByRole('button', { name: /store transactions/i })
    await user.click(typeButton)
    const storeTransactionsCheckbox = screen.getByRole('checkbox', { name: /store transactions/i })
    await user.click(storeTransactionsCheckbox)

    // Apply filter
    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)

    // Should show filter count
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})