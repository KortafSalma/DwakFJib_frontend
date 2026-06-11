import { pharmacyService } from '../api';
import { useApiMutation, useApiQuery } from './useApi';

export const usePharmacies = (params = {}, options = {}) => {
  return useApiQuery(() => pharmacyService.getPharmacies(params), { ...options, autoFetch: true });
};

export const usePharmacy = (id, options = {}) => {
  return useApiQuery(() => pharmacyService.getPharmacy(id), { ...options, autoFetch: !!id });
};

export const useCreatePharmacy = (options = {}) => {
  return useApiMutation(pharmacyService.createPharmacy, options);
};

export const useUpdatePharmacy = (options = {}) => {
  return useApiMutation((id, data) => pharmacyService.updatePharmacy(id, data), options);
};

export const useDeletePharmacy = (options = {}) => {
  return useApiMutation(pharmacyService.deletePharmacy, options);
};

export const useMedications = (params = {}, options = {}) => {
  return useApiQuery(() => pharmacyService.getMedications(params), { ...options, autoFetch: true });
};

export const useMedication = (id, options = {}) => {
  return useApiQuery(() => pharmacyService.getMedication(id), { ...options, autoFetch: !!id });
};

export const useCreateMedication = (options = {}) => {
  return useApiMutation(pharmacyService.createMedication, options);
};

export const useUpdateMedication = (options = {}) => {
  return useApiMutation((id, data) => pharmacyService.updateMedication(id, data), options);
};

export const useDeleteMedication = (options = {}) => {
  return useApiMutation(pharmacyService.deleteMedication, options);
};

export const useStockHistory = (id, params = {}, options = {}) => {
  return useApiQuery(() => pharmacyService.getStockHistory(id, params), {
    ...options,
    autoFetch: !!id,
  });
};

export const useAdjustStock = (options = {}) => {
  return useApiMutation((id, data) => pharmacyService.adjustStock(id, data), options);
};

export const useReservations = (params = {}, options = {}) => {
  return useApiQuery(() => pharmacyService.getReservations(params), { ...options, autoFetch: true });
};

export const useReservation = (id, options = {}) => {
  return useApiQuery(() => pharmacyService.getReservation(id), { ...options, autoFetch: !!id });
};

export const useCreateReservation = (options = {}) => {
  return useApiMutation(pharmacyService.createReservation, options);
};

export const useUpdateReservation = (options = {}) => {
  return useApiMutation((id, data) => pharmacyService.updateReservation(id, data), options);
};

export const useCancelReservation = (options = {}) => {
  return useApiMutation(pharmacyService.cancelReservation, options);
};

export const usePharmacyReviews = (pharmacyId, params = {}, options = {}) => {
  return useApiQuery(() => pharmacyService.getPharmacyReviews(pharmacyId, params), {
    ...options,
    autoFetch: !!pharmacyId,
  });
};

export const useCreateReview = (options = {}) => {
  return useApiMutation(pharmacyService.createReview, options);
};

export const useDeleteReview = (options = {}) => {
  return useApiMutation(pharmacyService.deleteReview, options);
};

export default {
  usePharmacies,
  usePharmacy,
  useCreatePharmacy,
  useUpdatePharmacy,
  useDeletePharmacy,
  useMedications,
  useMedication,
  useCreateMedication,
  useUpdateMedication,
  useDeleteMedication,
  useStockHistory,
  useAdjustStock,
  useReservations,
  useReservation,
  useCreateReservation,
  useUpdateReservation,
  useCancelReservation,
  usePharmacyReviews,
  useCreateReview,
  useDeleteReview,
};
