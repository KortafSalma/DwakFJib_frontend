import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NotificationLayout from '../components/notifications/NotificationLayout'

const mockNotifications = [
  { id: 1, type: 'info', title: 'Test Notification', description: 'Test description', time: '2m ago', isUnread: true },
  { id: 2, type: 'success', title: 'Success Notification', description: 'Success description', time: '1h ago', isUnread: false },
]

describe('NotificationLayout', () => {
  it('renders title and subtitle', () => {
    render(<NotificationLayout title="Test Title" subtitle="Test Subtitle" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('renders default title when not provided', () => {
    render(<NotificationLayout />)
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('renders notifications list', () => {
    render(<NotificationLayout notifications={mockNotifications} />)
    expect(screen.getByText('Test Notification')).toBeInTheDocument()
    expect(screen.getByText('Success Notification')).toBeInTheDocument()
  })

  it('shows empty state when no notifications', () => {
    render(<NotificationLayout notifications={[]} />)
    expect(screen.getByText('No notifications')).toBeInTheDocument()
  })

  it('renders children when notifications prop is not provided', () => {
    render(<NotificationLayout><div>Child Content</div></NotificationLayout>)
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('shows mark all read button when unreadCount > 0', () => {
    render(<NotificationLayout notifications={mockNotifications} unreadCount={1} />)
    expect(screen.getByText('Mark all read')).toBeInTheDocument()
  })

  it('calls onMarkAllRead when button clicked', () => {
    const onMarkAllRead = vi.fn()
    render(<NotificationLayout notifications={mockNotifications} unreadCount={1} onMarkAllRead={onMarkAllRead} />)
    fireEvent.click(screen.getByText('Mark all read'))
    expect(onMarkAllRead).toHaveBeenCalledOnce()
  })

  it('renders filter tabs', () => {
    const tabs = [{ key: 'all', label: 'All' }, { key: 'info', label: 'Info' }]
    render(<NotificationLayout notifications={mockNotifications} filterTabs={tabs} activeFilter="all" />)
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('calls onFilterChange when tab clicked', () => {
    const onFilterChange = vi.fn()
    const tabs = [{ key: 'info', label: 'Info' }]
    render(<NotificationLayout notifications={mockNotifications} filterTabs={tabs} activeFilter="all" onFilterChange={onFilterChange} />)
    const tab = screen.getByRole('button', { name: 'Info' })
    fireEvent.click(tab)
    expect(onFilterChange).toHaveBeenCalledWith('info')
  })
})
