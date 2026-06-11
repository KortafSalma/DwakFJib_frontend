import { useApiMutation, useApiQuery } from './useApi';
import { authService } from '../api';

export const useLogin = (options = {}) => {
  return useApiMutation(authService.login, {
    successMessage: false,
    ...options,
  });
};

export const useRegister = (options = {}) => {
  return useApiMutation(authService.register, {
    successMessage: false,
    ...options,
  });
};

export const useLogout = (options = {}) => {
  return useApiMutation(authService.logout, {
    successMessage: false,
    ...options,
  });
};

export const useMe = (options = {}) => {
  return useApiQuery(authService.me, {
    autoFetch: false,
    ...options,
  });
};

export const useForgotPassword = (options = {}) => {
  return useApiMutation(authService.forgotPassword, options);
};

export const useResetPassword = (options = {}) => {
  return useApiMutation(authService.resetPassword, options);
};

export default {
  useLogin,
  useRegister,
  useLogout,
  useMe,
  useForgotPassword,
  useResetPassword,
};
