import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebounce } from './useHooks';

export const usePaginatedApi = (apiFn, initialParams = {}, options = {}) => {
  const [params, setParams] = useState({ page: 1, ...initialParams });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const fetchRef = useRef(null);
  const prevDebouncedRef = useRef();

  const debouncedParams = useDebounce(params, options.debounceMs || 300);

  fetchRef.current = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFn(debouncedParams);
      const responseData = response.data;
      const payload = responseData.data || responseData;

      if (payload?.data) {
        setData(payload.data);
      } else {
        setData(payload);
      }

      if (payload?.meta || responseData?.pagination) {
        const m = payload.meta || responseData.pagination;
        setMeta({
          currentPage: m.current_page ?? m.currentPage,
          lastPage: m.last_page ?? m.lastPage,
          perPage: m.per_page ?? m.perPage,
          total: m.total,
          from: m.from,
          to: m.to,
        });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [apiFn, debouncedParams]);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchRef.current();
    }
  }, [options.autoFetch]);

  useEffect(() => {
    if (prevDebouncedRef.current !== undefined && prevDebouncedRef.current !== debouncedParams) {
      fetchRef.current();
    }
    prevDebouncedRef.current = debouncedParams;
  }, [debouncedParams]);

  const setPage = useCallback((page) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const setFilter = useCallback((key, value) => {
    setParams((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const setFilters = useCallback((newFilters) => {
    setParams((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setParams({ page: 1, ...initialParams });
  }, [initialParams]);

  const refetch = useCallback(() => {
    fetchRef.current();
  }, []);

  return {
    data,
    loading,
    error,
    meta,
    params,
    setPage,
    setFilter,
    setFilters,
    resetFilters,
    refetch,
  };
};

export const useFilterState = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const removeFilter = useCallback((key) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key] !== '' && filters[key] !== null && filters[key] !== undefined
  );

  return { filters, setFilter, removeFilter, resetFilters, hasActiveFilters };
};

export default usePaginatedApi;
