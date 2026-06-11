import toast from 'react-hot-toast';

const errorMessages = {
  400: 'Bad request. Please check your input.',
  401: 'Session expired. Please sign in again.',
  403: 'You don\'t have permission to perform this action.',
  404: 'The requested resource was not found.',
  409: 'This record already exists.',
  422: 'Validation failed. Please check your input.',
  429: 'Too many requests. Please try again later.',
  500: 'Server error. Please try again.',
  503: 'Service unavailable. Please try again later.',
};

export const handleApiError = (error, options = {}) => {
  const { showToast = true, silentCodes = [] } = options;

  if (!error) {
    if (showToast) toast.error('An unexpected error occurred');
    return { message: 'An unexpected error occurred' };
  }

  const status = error.status || error.response?.status;
  const message = error.message || error.response?.data?.message || errorMessages[status] || 'Something went wrong';

  if (silentCodes.includes(status)) {
    return { message, status };
  }

  if (showToast) {
    toast.error(message);
  }

  return { message, status };
};

export const handleApiSuccess = (message, options = {}) => {
  const { showToast = true } = options;
  if (showToast && message) {
    toast.success(message);
  }
};

export const getErrorMessage = (error) => {
  if (!error) return 'Unknown error';
  return error.message || error.response?.data?.message || 'Something went wrong';
};

export const isAuthError = (error) => {
  return error?.status === 401 || error?.response?.status === 401;
};

export const isValidationError = (error) => {
  return error?.status === 422 || error?.response?.status === 422;
};

export const getFieldErrors = (error) => {
  return error?.response?.data?.errors || error?.response?.data?.error || {};
};

export default handleApiError;
