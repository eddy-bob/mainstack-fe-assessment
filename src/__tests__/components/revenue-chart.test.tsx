import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RevenueChart } from '@/components/revenue-chart'
import '@testing-library/jest-dom'

// Mock the fetchChartData function
jest.mock('@/lib/api', () => ({
  ...jest.requireActual('@/lib/api'),
  fetchChartData: jest.fn(),
}))

const mockFetchChartData = require('@/lib/api').fetchChartData

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
    mockFetchChartData.mockImplementation(() => new Promise(() => {})) 

    renderWithQueryClient(<RevenueChart />)

    expect(screen.getByText('Loading chart...')).toBeInTheDocument()
  })

  it('should show no data message when no data', async () => {
    mockFetchChartData.mockResolvedValueOnce([])

    renderWithQueryClient(<RevenueChart />)

    await waitFor(() => {
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })
  })

  it('should render chart when data is available', async () => {
    const mockChartData = [
      { date: '2022-03-01', value: 100 },
      { date: '2022-03-02', value: 200 },
      { date: '2022-03-03', value: 150 },
    ]

    mockFetchChartData.mockResolvedValueOnce(mockChartData)

    renderWithQueryClient(<RevenueChart />)

    await waitFor(() => {
      expect(screen.getByText('Mar 1, 2022')).toBeInTheDocument()
      expect(screen.getByText('Mar 3, 2022')).toBeInTheDocument()
    })
  })

  it('should display date range correctly', async () => {
    const mockChartData = [
      { date: '2022-03-01', value: 100 },
      { date: '2022-03-05', value: 200 },
    ]

    mockFetchChartData.mockResolvedValueOnce(mockChartData)

    renderWithQueryClient(<RevenueChart />)

    await waitFor(() => {
      expect(screen.getByText('Mar 1, 2022')).toBeInTheDocument()
      expect(screen.getByText('Mar 5, 2022')).toBeInTheDocument()
    })
  })
})
