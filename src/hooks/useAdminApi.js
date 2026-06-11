import { adminService } from '../api';
import { useApiMutation, useApiQuery } from './useApi';

export const useAdminDashboard = (options = {}) => {
  return useApiQuery(adminService.dashboard, options);
};

export const useRevenueChart = (days = 30, options = {}) => {
  return useApiQuery(() => adminService.revenueChart(days), options);
};

export const useReservationChart = (days = 30, options = {}) => {
  return useApiQuery(() => adminService.reservationChart(days), options);
};

export const useTopMedications = (limit = 10, options = {}) => {
  return useApiQuery(() => adminService.topMedications(limit), options);
};

export const useTopPharmacies = (limit = 10, options = {}) => {
  return useApiQuery(() => adminService.topPharmacies(limit), options);
};

export const useActivityTimeline = (limit = 20, options = {}) => {
  return useApiQuery(() => adminService.activityTimeline(limit), options);
};

export const useAdminUsers = (params = {}, options = {}) => {
  return useApiQuery(() => adminService.getUsers(params), { ...options, autoFetch: true });
};

export const useAdminUser = (id, options = {}) => {
  return useApiQuery(() => adminService.getUser(id), { ...options, autoFetch: !!id });
};

export const useCreateUser = (options = {}) => {
  return useApiMutation(adminService.createUser, options);
};

export const useUpdateUser = (options = {}) => {
  return useApiMutation((id, data) => adminService.updateUser(id, data), options);
};

export const useDeleteUser = (options = {}) => {
  return useApiMutation(adminService.deleteUser, options);
};

export const useBanUser = (options = {}) => {
  return useApiMutation(adminService.banUser, options);
};

export const useUnbanUser = (options = {}) => {
  return useApiMutation(adminService.unbanUser, options);
};

export const useChangeUserRole = (options = {}) => {
  return useApiMutation((id, data) => adminService.changeUserRole(id, data), options);
};

export const useVerifyPharmacy = (options = {}) => {
  return useApiMutation(adminService.verifyPharmacy, options);
};

export default {
  useAdminDashboard,
  useRevenueChart,
  useReservationChart,
  useTopMedications,
  useTopPharmacies,
  useActivityTimeline,
  useAdminUsers,
  useAdminUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useBanUser,
  useUnbanUser,
  useChangeUserRole,
  useVerifyPharmacy,
};
