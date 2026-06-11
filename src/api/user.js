import api from './axios';

export const userService = {
  searchMedications: (query, params = {}) => {
    const searchParams = new URLSearchParams({ q: query, ...params }).toString();
    return api.get(`/user/medications/search?${searchParams}`);
  },

  nearbyPharmacies: (lat, lng, params = {}) => {
    const searchParams = new URLSearchParams({ lat, lng, ...params }).toString();
    return api.get(`/user/pharmacies/nearby?${searchParams}`);
  },

  myReservations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/user/reservations${query ? `?${query}` : ''}`);
  },
  reservationSummary: () => api.get('/user/reservations/summary'),

  getNotificationPreferences: () => api.get('/user/notification-preferences'),
  updateNotificationPreferences: (data) => api.patch('/user/notification-preferences', data),

  getFavorites: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/favorites${query ? `?${query}` : ''}`);
  },
  addFavorite: (pharmacyId) => api.post(`/favorites/${pharmacyId}`),
  removeFavorite: (pharmacyId) => api.delete(`/favorites/${pharmacyId}`),
  checkFavorite: (pharmacyId) => api.get(`/favorites/${pharmacyId}/check`),

  getMedicalCertificates: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/medical-certificates${query ? `?${query}` : ''}`);
  },
  uploadMedicalCertificate: (data) => {
    return api.post('/medical-certificates', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getMedicalCertificate: (id) => api.get(`/medical-certificates/${id}`),
  updateMedicalCertificate: (id, data) => api.patch(`/medical-certificates/${id}`, data),
  deleteMedicalCertificate: (id) => api.delete(`/medical-certificates/${id}`),
};

export default userService;
