import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { usePaginatedApi, useFilterState } from '../hooks/usePaginatedApi'

vi.mock('../hooks/useHooks', () => ({
  useDebounce: (value) => value,
}))

describe('usePaginatedApi', () => {
  let apiFn

  beforeEach(() => {
    apiFn = vi.fn().mockResolvedValue({ data: { data: [] } })
  })

  it('returns initial state', () => {
    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, { autoFetch: false }))
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.meta).toBeNull()
    expect(result.current.params).toEqual({ page: 1 })
  })

  it('fetches on mount when autoFetch is true (default)', async () => {
    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))
    await waitFor(() => expect(result.current.data).toEqual([]))
    expect(result.current.loading).toBe(false)
  })

  it('does NOT fetch on mount when autoFetch is false', () => {
    renderHook(() => usePaginatedApi(apiFn, {}, { autoFetch: false }))
    expect(apiFn).not.toHaveBeenCalled()
  })

  it('sets loading state during fetch', async () => {
    let resolvePromise
    apiFn.mockImplementation(() => new Promise((resolve) => { resolvePromise = resolve }))

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))
    expect(result.current.loading).toBe(true)

    await act(async () => { resolvePromise({ data: { data: ['item'] } }) })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual(['item'])
  })

  it('sets error when apiFn rejects', async () => {
    const error = new Error('Network error')
    apiFn.mockRejectedValue(error)

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))

    await waitFor(() => expect(result.current.error).toBe(error))
    expect(result.current.loading).toBe(false)
  })

  it('parses pagination meta from responseData.meta (respondPaginated format)', async () => {
    const meta = { current_page: 1, last_page: 5, per_page: 10, total: 50, from: 1, to: 10 }
    apiFn.mockResolvedValue({ data: { data: [], meta } })

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))

    await waitFor(() =>
      expect(result.current.meta).toEqual({
        currentPage: 1,
        lastPage: 5,
        perPage: 10,
        total: 50,
        from: 1,
        to: 10,
      })
    )
  })

  it('parses pagination from responseData.pagination', async () => {
    const pagination = { current_page: 2, last_page: 3, per_page: 20, total: 60, from: 21, to: 40 }
    apiFn.mockResolvedValue({ data: { data: [], pagination } })

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))

    await waitFor(() =>
      expect(result.current.meta).toEqual({
        currentPage: 2,
        lastPage: 3,
        perPage: 20,
        total: 60,
        from: 21,
        to: 40,
      })
    )
  })

  it('parses pagination meta from nested payload.data.meta', async () => {
    const meta = { current_page: 3, last_page: 8, per_page: 15, total: 120, from: 31, to: 45 }
    apiFn.mockResolvedValue({ data: { data: { data: [], meta } } })

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))

    await waitFor(() =>
      expect(result.current.meta).toEqual({
        currentPage: 3,
        lastPage: 8,
        perPage: 15,
        total: 120,
        from: 31,
        to: 45,
      })
    )
  })

  it('handles flat response data (no nested .data)', async () => {
    apiFn.mockResolvedValue({ data: [{ id: 1, name: 'med' }] })

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))

    await waitFor(() => expect(result.current.data).toEqual([{ id: 1, name: 'med' }]))
  })

  it('handles nested response data (data.data pattern)', async () => {
    const items = [{ id: 1, name: 'Doliprane' }]
    apiFn.mockResolvedValue({ data: { data: items } })

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))

    await waitFor(() => expect(result.current.data).toEqual(items))
  })

  it('fetches when setFilter is called', async () => {
    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, { autoFetch: false }))
    expect(apiFn).not.toHaveBeenCalled()

    act(() => { result.current.setFilter('query', 'doliprane') })

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))
    expect(apiFn.mock.calls[0][0].query).toBe('doliprane')
    expect(apiFn.mock.calls[0][0].page).toBe(1)
  })

  it('resets page to 1 when setFilter is called after navigating', async () => {
    apiFn.mockResolvedValue({ data: { data: [], meta: { current_page: 3, last_page: 10, per_page: 10, total: 100 } } })

    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))

    act(() => { result.current.setPage(5) })
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(2))

    act(() => { result.current.setFilter('query', 'test') })
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(3))
    expect(apiFn.mock.calls[2][0].page).toBe(1)
  })

  it('fetches when setPage is called', async () => {
    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, { autoFetch: false }))

    act(() => { result.current.setPage(3) })

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))
    expect(apiFn.mock.calls[0][0].page).toBe(3)
  })

  it('fetches with batch filters via setFilters', async () => {
    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, { autoFetch: false }))

    act(() => { result.current.setFilters({ category: 'Pain Relief', in_stock: true }) })

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))
    const p = apiFn.mock.calls[0][0]
    expect(p.category).toBe('Pain Relief')
    expect(p.in_stock).toBe(true)
    expect(p.page).toBe(1)
  })

  it('resets to initial params via resetFilters', async () => {
    const { result } = renderHook(
      () => usePaginatedApi(apiFn, { city: 'Casablanca' }, { autoFetch: false })
    )

    act(() => { result.current.setFilter('city', 'Rabat') })
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))

    act(() => { result.current.resetFilters() })
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(2))

    const p = apiFn.mock.calls[1][0]
    expect(p.city).toBe('Casablanca')
    expect(p.page).toBe(1)
  })

  it('calls apiFn again via refetch', async () => {
    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, {}))
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))

    act(() => { result.current.refetch() })
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(2))
  })

  it('fetches when autoFetch transitions from false to true', async () => {
    const { result, rerender } = renderHook(
      ({ autoFetch }) => usePaginatedApi(apiFn, {}, { autoFetch }),
      { initialProps: { autoFetch: false } }
    )
    expect(apiFn).not.toHaveBeenCalled()

    rerender({ autoFetch: true })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(apiFn).toHaveBeenCalledTimes(1)
  })

  it('does not fetch on unrelated re-renders (no param change)', async () => {
    const { result } = renderHook(() => usePaginatedApi(apiFn, {}, { autoFetch: false }))
    expect(apiFn).not.toHaveBeenCalled()

    act(() => { result.current.refetch() })
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))

    act(() => { result.current.refetch() })
    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(2))
    expect(apiFn).toHaveBeenCalledTimes(2)
  })
})

describe('useFilterState', () => {
  it('returns initial filters', () => {
    const { result } = renderHook(() => useFilterState({ role: 'admin', status: 'active' }))
    expect(result.current.filters).toEqual({ role: 'admin', status: 'active' })
    expect(result.current.hasActiveFilters).toBe(true)
  })

  it('returns empty filters with no initial value', () => {
    const { result } = renderHook(() => useFilterState())
    expect(result.current.filters).toEqual({})
    expect(result.current.hasActiveFilters).toBe(false)
  })

  it('sets a filter via setFilter', () => {
    const { result } = renderHook(() => useFilterState())
    act(() => { result.current.setFilter('status', 'pending') })
    expect(result.current.filters).toEqual({ status: 'pending' })
    expect(result.current.hasActiveFilters).toBe(true)
  })

  it('removes a filter via removeFilter', () => {
    const { result } = renderHook(() => useFilterState({ status: 'active', role: 'admin' }))
    act(() => { result.current.removeFilter('role') })
    expect(result.current.filters).toEqual({ status: 'active' })
  })

  it('resets filters to initial state', () => {
    const { result } = renderHook(() => useFilterState({ city: 'Casablanca' }))
    act(() => { result.current.setFilter('city', 'Rabat') })
    expect(result.current.filters).toEqual({ city: 'Rabat' })

    act(() => { result.current.resetFilters() })
    expect(result.current.filters).toEqual({ city: 'Casablanca' })
  })

  it('hasActiveFilters is true when filters are set', () => {
    const { result } = renderHook(() => useFilterState())
    expect(result.current.hasActiveFilters).toBe(false)

    act(() => { result.current.setFilter('q', 'test') })
    expect(result.current.hasActiveFilters).toBe(true)

    act(() => { result.current.setFilter('q', '') })
    expect(result.current.hasActiveFilters).toBe(false)
  })
})
