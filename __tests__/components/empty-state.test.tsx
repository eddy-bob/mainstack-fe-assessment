import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransactionEmptyState } from '@/components/empty-state'

describe('TransactionEmptyState Component', () => {
  const defaultProps = {
    onClearFilter: jest.fn(),
    hasFilters: false,
    icon: <div data-testid="icon">Icon</div>,
    title: 'No transactions found',
    description: 'Try adjusting your filters',
    actionLabel: 'Clear Filters',
    onAction: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with provided props', () => {
    render(<TransactionEmptyState {...defaultProps} />)

    expect(screen.getByText('No transactions found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument()
    expect(screen.getByText('Clear Filters')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should call onAction when action button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = jest.fn()
    
    render(<TransactionEmptyState {...defaultProps} onAction={onAction} />)

    const actionButton = screen.getByText('Clear Filters')
    await user.click(actionButton)

    expect(onAction).toHaveBeenCalled()
  })

  it('should show different content when hasFilters is true', () => {
    render(<TransactionEmptyState {...defaultProps} hasFilters={true} />)

    expect(screen.getByText('No matching transaction found for the selected filter')).toBeInTheDocument()
    expect(screen.getByText('Change your filters to see more results, or add a new product.')).toBeInTheDocument()
  })

  it('should call onClearFilter when clear filter button is clicked', async () => {
    const user = userEvent.setup()
    const onClearFilter = jest.fn()
    
    render(<TransactionEmptyState {...defaultProps} onClearFilter={onClearFilter} />)

    const clearButton = screen.getByText('Clear Filters')
    await user.click(clearButton)

    expect(onClearFilter).toHaveBeenCalled()
  })
})
