import React from 'react'
import { render, screen } from '@testing-library/react'
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

describe('TransactionList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show loading state', () => {
    mockUseTransactions.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<TransactionList />)

    expect(screen.getByText('Loading transactions...')).toBeInTheDocument()
  })

  it('should show error state', () => {
    const errorMessage = 'Failed to fetch transactions'
    mockUseTransactions.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    })

    renderWithQueryClient(<TransactionList />)

    expect(screen.getByText(`Failed to load transactions. ${errorMessage}`)).toBeInTheDocument()
  })

  it('should display transactions when data is loaded', () => {
    const transactions = [
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
    ]

    mockUseTransactions.mockReturnValue({
      data: transactions,
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<TransactionList />)

    expect(screen.getByText('1 Transactions')).toBeInTheDocument()
    expect(screen.getByText('Rich Dad Poor Dad')).toBeInTheDocument()
    expect(screen.getByText('USD 500')).toBeInTheDocument()
  })

  it('should open filter panel when filter button is clicked', async () => {
    const user = userEvent.setup()
    mockUseTransactions.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<TransactionList />)

    const filterButtons = screen.getAllByRole('button', { name: /filter/i })
    const filterButton = filterButtons[0] // Get the first filter button
    await user.click(filterButton)

    expect(screen.getByText('Date Range')).toBeInTheDocument()
  })

  it('should show correct transaction count', () => {
    const transactions = [
      { amount: 100, status: 'successful', type: 'deposit', date: '2022-03-01T10:00:00Z', payment_reference: 'ref1' },
      { amount: 200, status: 'successful', type: 'withdrawal', date: '2022-03-02T10:00:00Z', payment_reference: 'ref2' },
    ]

    mockUseTransactions.mockReturnValue({
      data: transactions,
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<TransactionList />)

    expect(screen.getByText('2 Transactions')).toBeInTheDocument()
  })

  it('should display transaction amounts with proper formatting', () => {
    const transactions = [
      { amount: 1000, status: 'successful', type: 'deposit', date: '2022-03-01T10:00:00Z', payment_reference: 'ref1' },
    ]

    mockUseTransactions.mockReturnValue({
      data: transactions,
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<TransactionList />)

    expect(screen.getByText('USD 1,000')).toBeInTheDocument()
  })

  it('should display transaction dates in correct format', () => {
    const transactions = [
      { amount: 100, status: 'successful', type: 'deposit', date: '2022-03-01T10:00:00Z', payment_reference: 'ref1' },
    ]

    mockUseTransactions.mockReturnValue({
      data: transactions,
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<TransactionList />)

    expect(screen.getByText('Mar 01, 2022')).toBeInTheDocument()
  })
})