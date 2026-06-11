import { messagingService } from '../api';
import { useApiMutation, useApiQuery } from './useApi';

export const useConversations = (params = {}, options = {}) => {
  return useApiQuery(() => messagingService.getConversations(params), {
    ...options,
    autoFetch: true,
  });
};

export const useConversation = (id, options = {}) => {
  return useApiQuery(() => messagingService.getConversation(id), {
    ...options,
    autoFetch: !!id,
  });
};

export const useCreateConversation = (options = {}) => {
  return useApiMutation(messagingService.createConversation, options);
};

export const useMarkConversationRead = (options = {}) => {
  return useApiMutation(messagingService.markConversationRead, options);
};

export const useUnreadMessageCount = (options = {}) => {
  return useApiQuery(messagingService.getUnreadCount, {
    ...options,
    autoFetch: true,
  });
};

export const useMessages = (conversationId, options = {}) => {
  return useApiQuery(() => messagingService.getMessages(conversationId), {
    ...options,
    autoFetch: !!conversationId,
  });
};

export const useSendMessage = (options = {}) => {
  return useApiMutation(messagingService.sendMessage, options);
};

export const useMarkMessageRead = (options = {}) => {
  return useApiMutation(messagingService.markMessageRead, options);
};

export const useDeleteMessage = (options = {}) => {
  return useApiMutation(messagingService.deleteMessage, options);
};

export default {
  useConversations,
  useConversation,
  useCreateConversation,
  useMarkConversationRead,
  useUnreadMessageCount,
  useMessages,
  useSendMessage,
  useMarkMessageRead,
  useDeleteMessage,
};
