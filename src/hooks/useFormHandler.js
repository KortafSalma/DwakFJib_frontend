import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useFormHandler = ({
  onSubmit,
  onSuccess,
  onError,
  successMessage,
  resetOnSuccess = true,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(async (data, helpers) => {
    setSubmitting(true);
    try {
      await onSubmit(data, helpers);
      setSubmitted(true);
      if (successMessage) {
        toast.success(successMessage);
      }
      if (onSuccess) onSuccess(data);
      if (resetOnSuccess && helpers?.reset) {
        helpers.reset();
      }
    } catch (err) {
      const message = err?.message || 'Submission failed';
      if (onError) onError(err, message);
      if (helpers?.setError) {
        helpers.setError('root', { message });
      }
    } finally {
      setSubmitting(false);
    }
  }, [onSubmit, onSuccess, onError, successMessage, resetOnSuccess]);

  const reset = useCallback(() => {
    setSubmitting(false);
    setSubmitted(false);
  }, []);

  return { submitting, submitted, handleSubmit, reset };
};

export default useFormHandler;
