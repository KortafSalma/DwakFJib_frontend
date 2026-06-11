import api from './axios';

export const distributorService = {
  getDistributors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/distributors${query ? `?${query}` : ''}`);
  },
  getDistributor: (id) => api.get(`/distributors/${id}`),
  createDistributor: (data) => api.post('/distributors', data),
  updateDistributor: (id, data) => api.patch(`/distributors/${id}`, data),
  deleteDistributor: (id) => api.delete(`/distributors/${id}`),

  getDistributorOrders: (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/distributors/${id}/orders${query ? `?${query}` : ''}`);
  },
  getDistributorDeliveries: (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/distributors/${id}/deliveries${query ? `?${query}` : ''}`);
  },
  updateOrderStatus: (distributorId, orderId, status) =>
    api.patch(`/distributors/${distributorId}/orders/${orderId}/status`, { status }),
  getDistributorAnalytics: (id) => api.get(`/distributors/${id}/analytics`),

  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/orders${query ? `?${query}` : ''}`);
  },
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (data) => api.post('/orders', data),
  updateOrder: (id, data) => api.patch(`/orders/${id}`, data),
  deleteOrder: (id) => api.delete(`/orders/${id}`),

  getDeliveries: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/deliveries${query ? `?${query}` : ''}`);
  },
  getDelivery: (id) => api.get(`/deliveries/${id}`),
  createDelivery: (data) => api.post('/deliveries', data),
  updateDelivery: (id, data) => api.patch(`/deliveries/${id}`, data),
  updateDeliveryStatus: (id, data) => api.patch(`/deliveries/${id}/status`, data),
  trackByNumber: (trackingNumber) => api.get(`/deliveries/track/${trackingNumber}`),
  deleteDelivery: (id) => api.delete(`/deliveries/${id}`),
};

export default distributorService;
