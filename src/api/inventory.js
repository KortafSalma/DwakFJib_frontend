import api from './axios';

export const inventoryService = {
  getExpiryMonitoring: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/inventory/expiry-monitoring${query ? `?${query}` : ''}`);
  },
  getLowStockForecast: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/inventory/low-stock-forecast${query ? `?${query}` : ''}`);
  },
  getMovementHistory: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/inventory/movement-history${query ? `?${query}` : ''}`);
  },
  getReorderRecommendations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/inventory/reorder-recommendations${query ? `?${query}` : ''}`);
  },
  getTrends: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/inventory/trends${query ? `?${query}` : ''}`);
  },
};

export default inventoryService;
