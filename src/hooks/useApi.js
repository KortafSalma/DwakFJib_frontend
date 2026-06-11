import { useState, useCallback, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortRef = useRef(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const {
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      showLoading = true,
    } = options;

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    if (showLoading) setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      const result = response?.data ?? response;
      setData(result);

      if (successMessage) toast.success(successMessage);
      if (onSuccess) onSuccess(result);

      return result;
    } catch (err) {
      if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') {
        throw err;
      }
      const message = err?.message || errorMessage || 'Something went wrong';
      setError(message);

      if (errorMessage !== false && err?.status !== 401) {
        toast.error(message);
      }
      if (onError) onError(err);

      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  useEffect(() => {
    const controller = abortRef.current;
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);

  return { loading, error, data, execute, reset };
};

export const useApiMutation = (apiCall, options = {}) => {
  const { loading, error, data, execute, reset } = useApi();

  const mutate = useCallback(
    async (...args) => {
      const lastArg = args[args.length - 1];
      const mutateOptions = typeof lastArg === 'object' && !Array.isArray(lastArg) ? lastArg : {};
      const callArgs = mutateOptions === lastArg ? args.slice(0, -1) : args;

      return execute(() => apiCall(...callArgs), { ...options, ...mutateOptions });
    },
    [apiCall, execute, options]
  );

  return { loading, error, data, mutate, reset };
};

export const useApiQuery = (apiCall, options = {}) => {
  const { loading, error, data, execute, reset } = useApi();
  const { autoFetch = true } = options;
  const hasFetched = useRef(false);

  const fetch = useCallback(async () => {
    return execute(apiCall);
  }, [apiCall, execute]);

  useEffect(() => {
    if (autoFetch && !hasFetched.current) {
      hasFetched.current = true;
      fetch();
    }
  }, [autoFetch, fetch]);

  const refetch = useCallback(() => {
    hasFetched.current = true;
    return fetch();
  }, [fetch]);

  return { loading, error, data, refetch, reset };
};

export default useApi;
