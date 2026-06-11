import api from './axios';

export const adminService = {
  dashboard: () => api.get('/admin/dashboard'),

  revenueChart: (days = 30) => api.get(`/admin/analytics/revenue?days=${days}`),
  reservationChart: (days = 30) => api.get(`/admin/analytics/reservations?days=${days}`),
  topMedications: (limit = 10) => api.get(`/admin/analytics/top-medications?limit=${limit}`),
  topPharmacies: (limit = 10) => api.get(`/admin/analytics/top-pharmacies?limit=${limit}`),
  activityTimeline: (limit = 20) => api.get(`/admin/analytics/activity?limit=${limit}`),

  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/admin/users${query ? `?${query}` : ''}`);
  },
  getUser: (id) => api.get(`/admin/users/${id}`),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.patch(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  banUser: (id) => api.post(`/admin/users/${id}/ban`),
  unbanUser: (id) => api.post(`/admin/users/${id}/unban`),
  changeUserRole: (id, data) => api.post(`/admin/users/${id}/role`, data),
  revokeUserTokens: (id) => api.post(`/admin/users/${id}/revoke-tokens`),

  verifyPharmacy: (id) => api.post(`/pharmacies/${id}/verify`),
};

export default adminService;
