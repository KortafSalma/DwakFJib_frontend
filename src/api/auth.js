import api from './axios';

export const authService = {
  login: (email, password) => api.post('/login', { email, password }),
  register: (userData) => api.post('/register', userData),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
  forgotPassword: (email) => api.post('/password/forgot', { email }),
  resetPassword: (data) => api.post('/password/reset', data),
  verifyResetToken: (token) => api.post('/password/verify-token', { token }),
};

export default authService;
