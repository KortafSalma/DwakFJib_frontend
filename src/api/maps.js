import api from './axios';

export const mapService = {
  getNearbyPharmacies: (lat, lng, radius = 10) =>
    api.get(`/user/pharmacies/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),

  getAllPharmacies: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/pharmacies${query ? `?${query}` : ''}`);
  },

  trackDelivery: (trackingNumber) => api.get(`/deliveries/track/${trackingNumber}`),

  getDeliveries: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/deliveries${query ? `?${query}` : ''}`);
  },
};

export const mockGeolocation = {
  lat: 36.7538,
  lng: 3.0588,
};

export const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve(mockGeolocation),
        { timeout: 5000 }
      );
    } else {
      resolve(mockGeolocation);
    }
  });
};

export default mapService;
