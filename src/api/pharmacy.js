import api from './axios';

export const pharmacyService = {
  getPharmacies: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/pharmacies${query ? `?${query}` : ''}`);
  },
  getPharmacy: (id) => api.get(`/pharmacies/${id}`),
  createPharmacy: (data) => api.post('/pharmacies', data),
  updatePharmacy: (id, data) => api.patch(`/pharmacies/${id}`, data),
  deletePharmacy: (id) => api.delete(`/pharmacies/${id}`),
  getPharmacyMedications: (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/pharmacies/${id}/medications${query ? `?${query}` : ''}`);
  },

  getMedications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/medications${query ? `?${query}` : ''}`);
  },
  getMedication: (id) => api.get(`/medications/${id}`),
  createMedication: (data) => api.post('/medications', data),
  updateMedication: (id, data) => api.patch(`/medications/${id}`, data),
  deleteMedication: (id) => api.delete(`/medications/${id}`),
  getStockHistory: (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/medications/${id}/stock-history${query ? `?${query}` : ''}`);
  },
  adjustStock: (id, data) => api.post(`/medications/${id}/adjust-stock`, data),
  purchaseMedication: (id, data) => api.post(`/medications/${id}/purchase`, data),
  scanBarcode: (barcode) => api.get(`/medications/barcode/${barcode}`),

  getReservations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/reservations${query ? `?${query}` : ''}`);
  },
  getReservation: (id) => api.get(`/reservations/${id}`),
  createReservation: (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/reservations', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
  },
  updateReservation: (id, data) => api.patch(`/reservations/${id}`, data),
  cancelReservation: (id) => api.post(`/reservations/${id}/cancel`),

  getReviews: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/reviews${query ? `?${query}` : ''}`);
  },
  getPharmacyReviews: (pharmacyId, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/pharmacies/${pharmacyId}/reviews${query ? `?${query}` : ''}`);
  },
  createReview: (data) => api.post('/reviews', data),
  updateReview: (id, data) => api.patch(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export const loyaltyService = {
  getLoyalPatients: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/loyal-patients${query ? `?${query}` : ''}`);
  },
  getLoyalPatient: (userId) => api.get(`/loyal-patients/${userId}`),
};

export const chatbotService = {
  sendMessage: (message) => api.post('/chatbot/message', { message }),
};

export const userService = {
  updatePhoto: (data) => api.post('/user/photo', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deletePhoto: () => api.delete('/user/photo'),
};

export default pharmacyService;
