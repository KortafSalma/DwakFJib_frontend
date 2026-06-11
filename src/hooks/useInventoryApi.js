import { inventoryService } from '../api';
import { useApiQuery } from './useApi';

export const useExpiryMonitoring = (options = {}) => {
  return useApiQuery(inventoryService.getExpiryMonitoring, { ...options, autoFetch: true });
};

export const useLowStockForecast = (params = {}, options = {}) => {
  return useApiQuery(() => inventoryService.getLowStockForecast(params), { ...options, autoFetch: true });
};

export const useMovementHistory = (params = {}, options = {}) => {
  return useApiQuery(() => inventoryService.getMovementHistory(params), { ...options, autoFetch: true });
};

export const useReorderRecommendations = (options = {}) => {
  return useApiQuery(inventoryService.getReorderRecommendations, { ...options, autoFetch: true });
};

export const useTrends = (params = {}, options = {}) => {
  return useApiQuery(() => inventoryService.getTrends(params), { ...options, autoFetch: true });
};

export default {
  useExpiryMonitoring,
  useLowStockForecast,
  useMovementHistory,
  useReorderRecommendations,
  useTrends,
};
