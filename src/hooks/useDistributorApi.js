import { distributorService } from '../api';
import { useApiMutation, useApiQuery } from './useApi';

export const useDistributors = (params = {}, options = {}) => {
  return useApiQuery(() => distributorService.getDistributors(params), {
    ...options,
    autoFetch: true,
  });
};

export const useDistributor = (id, options = {}) => {
  return useApiQuery(() => distributorService.getDistributor(id), {
    ...options,
    autoFetch: !!id,
  });
};

export const useCreateDistributor = (options = {}) => {
  return useApiMutation(distributorService.createDistributor, options);
};

export const useUpdateDistributor = (options = {}) => {
  return useApiMutation((id, data) => distributorService.updateDistributor(id, data), options);
};

export const useDeleteDistributor = (options = {}) => {
  return useApiMutation(distributorService.deleteDistributor, options);
};

export const useDistributorOrders = (id, params = {}, options = {}) => {
  return useApiQuery(() => distributorService.getDistributorOrders(id, params), {
    ...options,
    autoFetch: !!id,
  });
};

export const useDistributorDeliveries = (id, params = {}, options = {}) => {
  return useApiQuery(() => distributorService.getDistributorDeliveries(id, params), {
    ...options,
    autoFetch: !!id,
  });
};

export const useUpdateOrderStatus = (options = {}) => {
  return useApiMutation(
    (distributorId, orderId, status) =>
      distributorService.updateOrderStatus(distributorId, orderId, status),
    options
  );
};

export const useDistributorAnalytics = (id, options = {}) => {
  return useApiQuery(() => distributorService.getDistributorAnalytics(id), {
    ...options,
    autoFetch: !!id,
  });
};

export const useOrders = (params = {}, options = {}) => {
  return useApiQuery(() => distributorService.getOrders(params), { ...options, autoFetch: true });
};

export const useOrder = (id, options = {}) => {
  return useApiQuery(() => distributorService.getOrder(id), { ...options, autoFetch: !!id });
};

export const useCreateOrder = (options = {}) => {
  return useApiMutation(distributorService.createOrder, options);
};

export const useUpdateOrder = (options = {}) => {
  return useApiMutation((id, data) => distributorService.updateOrder(id, data), options);
};

export const useDeleteOrder = (options = {}) => {
  return useApiMutation(distributorService.deleteOrder, options);
};

export const useDeliveries = (params = {}, options = {}) => {
  return useApiQuery(() => distributorService.getDeliveries(params), {
    ...options,
    autoFetch: true,
  });
};

export const useDelivery = (id, options = {}) => {
  return useApiQuery(() => distributorService.getDelivery(id), { ...options, autoFetch: !!id });
};

export const useCreateDelivery = (options = {}) => {
  return useApiMutation(distributorService.createDelivery, options);
};

export const useUpdateDelivery = (options = {}) => {
  return useApiMutation((id, data) => distributorService.updateDelivery(id, data), options);
};

export const useUpdateDeliveryStatus = (options = {}) => {
  return useApiMutation((id, data) => distributorService.updateDeliveryStatus(id, data), options);
};

export const useTrackDelivery = (trackingNumber, options = {}) => {
  return useApiQuery(() => distributorService.trackByNumber(trackingNumber), {
    ...options,
    autoFetch: !!trackingNumber,
  });
};

export const useDeleteDelivery = (options = {}) => {
  return useApiMutation(distributorService.deleteDelivery, options);
};

export default {
  useDistributors,
  useDistributor,
  useCreateDistributor,
  useUpdateDistributor,
  useDeleteDistributor,
  useDistributorOrders,
  useDistributorDeliveries,
  useUpdateOrderStatus,
  useDistributorAnalytics,
  useOrders,
  useOrder,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
  useDeliveries,
  useDelivery,
  useCreateDelivery,
  useUpdateDelivery,
  useUpdateDeliveryStatus,
  useTrackDelivery,
  useDeleteDelivery,
};
