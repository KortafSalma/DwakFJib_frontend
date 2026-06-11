import { notificationService } from '../api';
import { useApiMutation, useApiQuery } from './useApi';

export const useNotifications = (params = {}, options = {}) => {
  return useApiQuery(() => notificationService.getNotifications(params), {
    ...options,
    autoFetch: true,
  });
};

export const useUnreadNotifications = (options = {}) => {
  return useApiQuery(notificationService.getUnreadNotifications, {
    autoFetch: true,
    ...options,
  });
};

export const useNotificationStats = (options = {}) => {
  return useApiQuery(notificationService.getNotificationStats, {
    autoFetch: true,
    ...options,
  });
};

export const useMarkAllAsRead = (options = {}) => {
  return useApiMutation(notificationService.markAllAsRead, options);
};

export const useMarkAsRead = (options = {}) => {
  return useApiMutation(notificationService.markAsRead, options);
};

export const useDeleteNotification = (options = {}) => {
  return useApiMutation(notificationService.deleteNotification, options);
};

export const useCreateNotification = (options = {}) => {
  return useApiMutation(notificationService.createNotification, options);
};

export default {
  useNotifications,
  useUnreadNotifications,
  useNotificationStats,
  useMarkAllAsRead,
  useMarkAsRead,
  useDeleteNotification,
  useCreateNotification,
};
