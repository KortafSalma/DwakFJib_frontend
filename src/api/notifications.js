import api from './axios';

export const notificationService = {
  getNotifications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/notifications${query ? `?${query}` : ''}`);
  },
  getUnreadNotifications: () => api.get('/notifications/unread'),
  getNotificationStats: () => api.get('/notifications/stats'),
  markAllAsRead: () => api.post('/notifications/mark-all-read'),
  getNotification: (id) => api.get(`/notifications/${id}`),
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  createNotification: (data) => api.post('/notifications', data),
};

export default notificationService;
