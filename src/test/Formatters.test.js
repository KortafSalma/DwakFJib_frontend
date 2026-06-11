import { describe, it, expect } from 'vitest'
import { formatTimeAgo, formatDate, formatDateShort } from '../utils/formatters'

describe('formatTimeAgo', () => {
  it('returns "just now" for current time', () => {
    expect(formatTimeAgo(new Date().toISOString())).toBe('Just now')
  })

  it('returns minutes for recent times', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    expect(formatTimeAgo(fiveMinAgo)).toBe('5m ago')
  })

  it('returns hours for older times', () => {
    const twoHrAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    expect(formatTimeAgo(twoHrAgo)).toBe('2h ago')
  })

  it('returns days for very old times', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    expect(formatTimeAgo(threeDaysAgo)).toBe('3d ago')
  })
})

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const result = formatDate('2026-06-09T12:00:00Z')
    expect(result).toContain('2026')
  })
})

describe('formatDateShort', () => {
  it('formats date short correctly', () => {
    const result = formatDateShort('2026-06-09T12:00:00Z')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})
