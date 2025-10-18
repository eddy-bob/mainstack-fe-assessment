import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterPanel } from '@/components/filter-panel'

describe('FilterPanel Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    setSelectedFilter: jest.fn(),
    selectedFilter: [],
    onDateRangeChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render when open', () => {
    render(<FilterPanel {...defaultProps} />)

    expect(screen.getByText('Filter')).toBeInTheDocument()
    expect(screen.getByText('Date Range')).toBeInTheDocument()
    expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    expect(screen.getByText('Transaction Status')).toBeInTheDocument()
  })

  it('should not render when closed', () => {
    render(<FilterPanel {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('Filter')).not.toBeInTheDocument()
  })

  it('should close when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    
    render(<FilterPanel {...defaultProps} onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('should render time period tabs', () => {
    render(<FilterPanel {...defaultProps} />)

    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('Last 7 days')).toBeInTheDocument()
    expect(screen.getByText('This month')).toBeInTheDocument()
    expect(screen.getByText('Last 3 months')).toBeInTheDocument()
  })

  it('should select time period when clicked', async () => {
    const user = userEvent.setup()
    
    render(<FilterPanel {...defaultProps} />)

    const todayButton = screen.getByText('Today')
    await user.click(todayButton)

    expect(todayButton).toHaveClass('bg-primary')
  })

  it('should render date range inputs', () => {
    render(<FilterPanel {...defaultProps} />)

    expect(screen.getByText('Jul 27, 2023')).toBeInTheDocument() // Start date
    expect(screen.getByText('Aug 17, 2023')).toBeInTheDocument() // End date
  })

  it('should open transaction type dropdown when clicked', async () => {
    const user = userEvent.setup()
    
    render(<FilterPanel {...defaultProps} />)

    const typeButton = screen.getByRole('button', { name: /store transactions/i })
    await user.click(typeButton)

    expect(screen.getByText('Store Transactions')).toBeInTheDocument()
    expect(screen.getByText('Withdrawals')).toBeInTheDocument()
  })

  it('should toggle transaction type when checkbox is clicked', async () => {
    const user = userEvent.setup()
    const setSelectedFilter = jest.fn()
    
    render(<FilterPanel {...defaultProps} setSelectedFilter={setSelectedFilter} />)

    // Open dropdown
    const typeButton = screen.getByRole('button', { name: /store transactions/i })
    await user.click(typeButton)

    // Click checkbox
    const checkbox = screen.getByRole('checkbox', { name: /store transactions/i })
    await user.click(checkbox)

    expect(setSelectedFilter).toHaveBeenCalled()
  })

  it('should open transaction status dropdown when clicked', async () => {
    const user = userEvent.setup()
    
    render(<FilterPanel {...defaultProps} />)

    const statusButton = screen.getByRole('button', { name: /successful/i })
    await user.click(statusButton)

    expect(screen.getByText('Successful')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Failed')).toBeInTheDocument()
  })

  it('should render clear and apply buttons', () => {
    render(<FilterPanel {...defaultProps} />)

    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('Apply')).toBeInTheDocument()
  })

  it('should call onDateRangeChange when apply is clicked', async () => {
    const user = userEvent.setup()
    const onDateRangeChange = jest.fn()
    
    render(<FilterPanel {...defaultProps} onDateRangeChange={onDateRangeChange} />)

    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)

    expect(onDateRangeChange).toHaveBeenCalledWith('2023-07-27', '2023-08-17')
  })

  it('should call onClose when apply is clicked', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    
    render(<FilterPanel {...defaultProps} onClose={onClose} />)

    const applyButton = screen.getByText('Apply')
    await user.click(applyButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('should clear all filters when clear is clicked', async () => {
    const user = userEvent.setup()
    const setSelectedFilter = jest.fn()
    const onClose = jest.fn()
    
    render(<FilterPanel {...defaultProps} setSelectedFilter={setSelectedFilter} onClose={onClose} />)

    const clearButton = screen.getByText('Clear')
    await user.click(clearButton)

    expect(setSelectedFilter).toHaveBeenCalledWith([])
    expect(onClose).toHaveBeenCalled()
  })

  it('should show filter count when filters are selected', () => {
    render(<FilterPanel {...defaultProps} selectedFilter={['deposit', 'successful']} />)

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})