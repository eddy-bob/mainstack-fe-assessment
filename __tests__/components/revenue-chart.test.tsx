import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RevenueChart } from '@/components/revenue-chart'

// Mock the hooks
jest.mock('@/lib/hooks', () => ({
  useChartData: jest.fn(),
}))

const mockUseChartData = require('@/lib/hooks').useChartData

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

describe('RevenueChart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show loading state', () => {
    mockUseChartData.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<RevenueChart />)

    expect(screen.getByText('Loading chart...')).toBeInTheDocument()
  })

  it('should show no data message when no data', () => {
    mockUseChartData.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<RevenueChart />)

    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('should render chart when data is available', () => {
    const mockChartData = [
      { date: '2022-03-01', value: 100 },
      { date: '2022-03-02', value: 200 },
      { date: '2022-03-03', value: 150 },
    ]

    mockUseChartData.mockReturnValue({
      data: mockChartData,
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<RevenueChart />)

    expect(screen.getByText('Mar 1, 2022')).toBeInTheDocument()
    expect(screen.getByText('Mar 3, 2022')).toBeInTheDocument()
  })

  it('should display date range correctly', () => {
    const mockChartData = [
      { date: '2022-03-01', value: 100 },
      { date: '2022-03-05', value: 200 },
    ]

    mockUseChartData.mockReturnValue({
      data: mockChartData,
      isLoading: false,
      isError: false,
      error: null,
    })

    renderWithQueryClient(<RevenueChart />)

    expect(screen.getByText('Mar 1, 2022')).toBeInTheDocument()
    expect(screen.getByText('Mar 5, 2022')).toBeInTheDocument()
  })
})
