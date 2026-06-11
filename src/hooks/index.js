export { useOffline } from './useOffline';
export { useApi, useApiMutation, useApiQuery } from './useApi';
export { useFormHandler } from './useFormHandler';
export { useDebounce, useLocalStorage, useMediaQuery, useScrollPosition } from './useHooks';
export { usePaginatedApi, useFilterState } from './usePaginatedApi';

export {
  useLogin,
  useRegister,
  useLogout,
  useMe,
  useForgotPassword,
  useResetPassword,
} from './useAuthApi';

export {
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
} from './useAdminApi';

export {
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
} from './usePharmacyApi';

export {
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
} from './useDistributorApi';

export {
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
} from './useUserApi';

export {
  useConversations,
  useConversation,
  useCreateConversation,
  useMarkConversationRead,
  useUnreadMessageCount,
  useMessages,
  useSendMessage,
  useMarkMessageRead,
  useDeleteMessage,
} from './useMessagingApi';

export {
  useExpiryMonitoring,
  useLowStockForecast,
  useMovementHistory,
  useReorderRecommendations,
  useTrends,
} from './useInventoryApi';

export {
  useNotifications,
  useUnreadNotifications,
  useNotificationStats,
  useMarkAllAsRead,
  useMarkAsRead,
  useDeleteNotification,
  useCreateNotification,
} from './useNotificationApi';
