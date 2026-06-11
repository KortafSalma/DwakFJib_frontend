import { userService } from '../api';
import { useApiMutation, useApiQuery } from './useApi';

export const useSearchMedications = (query, params = {}, options = {}) => {
  return useApiQuery(() => userService.searchMedications(query, params), {
    ...options,
    autoFetch: !!query,
  });
};

export const useNearbyPharmacies = (lat, lng, params = {}, options = {}) => {
  return useApiQuery(() => userService.nearbyPharmacies(lat, lng, params), {
    ...options,
    autoFetch: !!(lat && lng),
  });
};

export const useMyReservations = (params = {}, options = {}) => {
  return useApiQuery(() => userService.myReservations(params), { ...options, autoFetch: true });
};

export const useReservationSummary = (options = {}) => {
  return useApiQuery(userService.reservationSummary, options);
};

export const useNotificationPreferences = (options = {}) => {
  return useApiQuery(userService.getNotificationPreferences, options);
};

export const useUpdateNotificationPreferences = (options = {}) => {
  return useApiMutation(userService.updateNotificationPreferences, options);
};

export const useFavorites = (params = {}, options = {}) => {
  return useApiQuery(() => userService.getFavorites(params), { ...options, autoFetch: true });
};

export const useAddFavorite = (options = {}) => {
  return useApiMutation(userService.addFavorite, options);
};

export const useRemoveFavorite = (options = {}) => {
  return useApiMutation(userService.removeFavorite, options);
};

export const useCheckFavorite = (pharmacyId, options = {}) => {
  return useApiQuery(() => userService.checkFavorite(pharmacyId), {
    ...options,
    autoFetch: !!pharmacyId,
  });
};

export const useMedicalCertificates = (params = {}, options = {}) => {
  return useApiQuery(() => userService.getMedicalCertificates(params), {
    ...options,
    autoFetch: true,
  });
};

export const useUploadMedicalCertificate = (options = {}) => {
  return useApiMutation(userService.uploadMedicalCertificate, options);
};

export const useDeleteMedicalCertificate = (options = {}) => {
  return useApiMutation(userService.deleteMedicalCertificate, options);
};

export default {
  useSearchMedications,
  useNearbyPharmacies,
  useMyReservations,
  useReservationSummary,
  useNotificationPreferences,
  useUpdateNotificationPreferences,
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
  useCheckFavorite,
  useMedicalCertificates,
  useUploadMedicalCertificate,
  useDeleteMedicalCertificate,
};
