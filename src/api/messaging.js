import api from './axios';

export const messagingService = {
  getConversations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/conversations${query ? `?${query}` : ''}`);
  },
  getConversation: (id) => api.get(`/conversations/${id}`),
  createConversation: (data) => api.post('/conversations', data),
  markConversationRead: (id) => api.post(`/conversations/${id}/read`),
  getUnreadCount: () => api.get('/conversations/unread-count'),
  getMessages: (conversationId, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/conversations/${conversationId}/messages${query ? `?${query}` : ''}`);
  },
  sendMessage: (conversationId, data) => {
    const isFormData = data instanceof FormData;
    return api.post(`/conversations/${conversationId}/messages`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
  },
  markMessageRead: (id) => api.post(`/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/messages/${id}`),
};

export default messagingService;
