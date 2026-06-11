import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { User } from 'lucide-react'
import StatCard from '../components/ui/StatCard'

describe('StatCard', () => {
  it('renders with label and value', () => {
    render(<StatCard icon={User} label="Users" value="42" change={0} />)
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders positive change indicator', () => {
    const { container } = render(<StatCard icon={User} label="Users" value="42" change={15} />)
    const el = container.querySelector('.text-emerald-600')
    expect(el).toBeInTheDocument()
    expect(el.textContent).toContain('15')
  })

  it('renders negative change indicator', () => {
    const { container } = render(<StatCard icon={User} label="Users" value="42" change={-5} />)
    const el = container.querySelector('.text-red-500')
    expect(el).toBeInTheDocument()
    expect(el.textContent).toContain('5')
  })

  it('shows change indicator when change is 0', () => {
    const { container } = render(<StatCard icon={User} label="Users" value="42" change={0} />)
    const el = container.querySelector('.text-emerald-600')
    expect(el).toBeInTheDocument()
    expect(el.textContent).toContain('0')
  })
})
