import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ErrorState from '../components/ui/ErrorState'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('ErrorState', () => {
  it('renders with default message', () => {
    const { container } = renderWithRouter(<ErrorState />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders custom title', () => {
    renderWithRouter(<ErrorState title="Custom error" />)
    expect(screen.getByText('Custom error')).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    const onRetry = () => {}
    renderWithRouter(<ErrorState onRetry={onRetry} />)
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('does not render retry button when onRetry is not provided', () => {
    const { container } = renderWithRouter(<ErrorState />)
    expect(container.querySelector('button')).not.toBeInTheDocument()
  })

  it('renders fullPage variant', () => {
    const { container } = renderWithRouter(<ErrorState fullPage />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
