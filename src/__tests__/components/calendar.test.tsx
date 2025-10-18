import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calendar } from '@/components/calendar'

describe('Calendar Component', () => {
  const defaultProps = {
    selectedDate: '2022-03-15',
    onDateSelect: jest.fn(),
    onClose: jest.fn(),
    isOpen: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render calendar when open', () => {
    render(<Calendar {...defaultProps} />)

    expect(screen.getByText('October')).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
  })

  it('should not render when closed', () => {
    render(<Calendar {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('October')).not.toBeInTheDocument()
  })

  it('should call onDateSelect when date is clicked', async () => {
    const user = userEvent.setup()
    const onDateSelect = jest.fn()
    
    render(<Calendar {...defaultProps} onDateSelect={onDateSelect} />)

    const dateButton = screen.getByRole('button', { name: '20' })
    await user.click(dateButton)

    expect(onDateSelect).toHaveBeenCalledWith('2025-10-20')
  })

  it('should call onClose when date is selected', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    
    render(<Calendar {...defaultProps} onClose={onClose} />)

    const dateButton = screen.getByRole('button', { name: '20' })
    await user.click(dateButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('should navigate to previous month', async () => {
    const user = userEvent.setup()
    
    render(<Calendar {...defaultProps} />)

    const prevButton = screen.getByRole('button', { name: /previous/i })
    await user.click(prevButton)

    expect(screen.getByText('September')).toBeInTheDocument()
  })

  it('should navigate to next month', async () => {
    const user = userEvent.setup()
    
    render(<Calendar {...defaultProps} />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    expect(screen.getByText('November')).toBeInTheDocument()
  })

  it('should show year selector when year is clicked', async () => {
    const user = userEvent.setup()
    
    render(<Calendar {...defaultProps} />)

    const yearButton = screen.getByRole('button', { name: '2025' })
    await user.click(yearButton)

    // Check that the year selector is visible by looking for a year in the selector
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('should select year when year is clicked in selector', async () => {
    const user = userEvent.setup()
    
    render(<Calendar {...defaultProps} />)

    // Open year selector
    const yearButton = screen.getByRole('button', { name: '2025' })
    await user.click(yearButton)

    // Select different year
    const year2024Button = screen.getByRole('button', { name: '2024' })
    await user.click(year2024Button)

    expect(screen.getByText('October')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('should format date correctly when selected', async () => {
    const user = userEvent.setup()
    const onDateSelect = jest.fn()
    
    render(<Calendar {...defaultProps} onDateSelect={onDateSelect} />)

    const dateButton = screen.getByRole('button', { name: '25' })
    await user.click(dateButton)

    expect(onDateSelect).toHaveBeenCalledWith('2025-10-25')
  })
})