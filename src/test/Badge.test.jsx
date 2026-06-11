import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Badge from '../components/ui/Badge'

describe('Badge', () => {
  it('renders with different variants', () => {
    const { container: c1 } = render(<Badge text="Default" />)
    const { container: c2 } = render(<Badge text="Success" variant="success" />)
    const { container: c3 } = render(<Badge text="Warning" variant="warning" />)
    const { container: c4 } = render(<Badge text="Error" variant="error" />)
    expect(c1.firstChild).toBeInTheDocument()
    expect(c2.firstChild).toBeInTheDocument()
    expect(c3.firstChild).toBeInTheDocument()
    expect(c4.firstChild).toBeInTheDocument()
  })
})
