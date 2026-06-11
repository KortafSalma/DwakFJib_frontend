import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || !('VITE_API_URL' in import.meta.env);

let mockHandler = null;

if (DEMO_MODE) {
  import('../mock/mockApi').then(mod => {
    mockHandler = mod.mockHandler;
    console.warn('[Mock] mockHandler loaded');
  }).catch(err => {
    console.warn('[Mock] Failed to load mockHandler:', err);
  });
}

const mockAdapter = DEMO_MODE ? async (config) => {
  const url = (config.url || '').replace(/https?:\/\/[^/]+/, '').replace(/^\/api/, '');
  const method = (config.method || 'get').toLowerCase();
  console.warn('[Mock] Request:', method, url);

  if (!mockHandler) {
    const fallbackUser = (() => {
      try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
    })();
    return {
      data: url.includes('/admin/dashboard') ? {
        total_users: 2450, total_pharmacies: 128, total_distributors: 45,
        total_reservations: 1890, active_users: 1890, monthly_revenue: 1280000,
        users_actifs: 1890, pharmacies_actives: 118,
        utilisateurs_par_role: [{ name: 'Patients', value: 1800, color: '#14B8A6' }],
      } : url.includes('/admin/analytics/activity') ? {
        data: [{ id: 1, action_type: 'user', description: 'Activity', user_name: 'Admin', created_at: new Date().toISOString(), type: 'user' }],
        meta: { current_page: 1, last_page: 1, per_page: 10, total: 1 },
      } : url.includes('/notifications/unread') ? {
        data: [], meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 },
      } : url.includes('/conversations/unread-count') ? {
        unread_count: 0,
      } : url.includes('/me') ? {
        id: fallbackUser?.id || 'usr_user',
        name: fallbackUser?.name || 'User',
        email: fallbackUser?.email || 'user@dwakfjib.ma',
        role: fallbackUser?.role || 'USER',
      } : { data: [], message: 'ok' },
      status: 200, statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      config,
    };
  }

  try {
    const response = await mockHandler(config);
    console.warn('[Mock] Response:', response.status, url);
    return { ...response, config };
  } catch (err) {
    console.warn('[Mock] Error:', err, url);
    return { data: null, status: 200, statusText: 'OK', headers: { 'content-type': 'application/json' }, config };
  }
} : undefined;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000,
  adapter: mockAdapter,
});

const isLoginRequest = (config) => {
  const url = (config?.url || '').replace(/https?:\/\/[^/]+/, '').replace(/^\/api/, '');
  return url === '/login' && (config?.method || '').toLowerCase() === 'post';
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest(originalRequest)) {
      originalRequest._retry = true;

      const token = localStorage.getItem('auth_token');
      if (!token) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { authService } = await import('./auth');
        await authService.me();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    const baseMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';

    const fieldErrors = error.response?.data?.errors;
    let message = baseMessage;
    if (fieldErrors && typeof fieldErrors === 'object') {
      const firstField = Object.keys(fieldErrors)[0];
      if (firstField && Array.isArray(fieldErrors[firstField]) && fieldErrors[firstField].length) {
        message = `${baseMessage} (${firstField}: ${fieldErrors[firstField][0]})`;
      }
    }

    return Promise.reject({
      message,
      status: error.response?.status,
      errors: error.response?.data?.errors || error.response?.data?.error || {},
      response: error.response,
    });
  }
);

export const getPaginationMeta = (response) => {
  const data = response?.data;
  if (!data) return null;
  const payload = data.data || data;
  if (payload?.meta) {
    return {
      currentPage: payload.meta.current_page ?? payload.meta.currentPage,
      lastPage: payload.meta.last_page ?? payload.meta.lastPage,
      perPage: payload.meta.per_page ?? payload.meta.perPage,
      total: payload.meta.total,
      from: payload.meta.from,
      to: payload.meta.to,
    };
  }
  if (payload?.links) {
    return {
      currentPage: payload.meta?.current_page,
      lastPage: payload.meta?.last_page,
      perPage: payload.meta?.per_page,
      total: payload.meta?.total,
    };
  }
  return null;
};

export const extractData = (response) => {
  const data = response?.data;
  if (!data) return response;
  return data.data ?? data;
};

export default api;
