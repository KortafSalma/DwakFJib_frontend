import api from './axios';

export const fileService = {
  downloadPrescription: (reservationId) =>
    api.get(`/files/prescriptions/${reservationId}`, { responseType: 'blob' }),

  downloadMedicalCertificate: (certificateId) =>
    api.get(`/files/medical-certificates/${certificateId}`, { responseType: 'blob' }),

  uploadFile: (file, endpoint) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const exportService = {
  exportMedications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/export/medications${query ? `?${query}` : ''}`, { responseType: 'blob' });
  },
  exportReservations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/export/reservations${query ? `?${query}` : ''}`, { responseType: 'blob' });
  },
  exportOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/export/orders${query ? `?${query}` : ''}`, { responseType: 'blob' });
  },
  exportStockMovements: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/export/stock-movements${query ? `?${query}` : ''}`, { responseType: 'blob' });
  },
};

export default fileService;
