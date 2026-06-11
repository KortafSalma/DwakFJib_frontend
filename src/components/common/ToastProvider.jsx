import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const toastStyles = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    style: { borderLeft: '4px solid #10B981' },
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    style: { borderLeft: '4px solid #EF4444' },
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    style: { borderLeft: '4px solid #F59E0B' },
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    style: { borderLeft: '4px solid #3B82F6' },
  },
};

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#FFFFFF',
          color: '#0F172A',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          fontSize: '14px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
          padding: '14px 18px',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        success: {
          icon: toastStyles.success.icon,
          style: toastStyles.success.style,
          iconTheme: { primary: '#10B981', secondary: '#FFFFFF' },
        },
        error: {
          icon: toastStyles.error.icon,
          style: toastStyles.error.style,
          iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' },
        },
      }}
    />
  );
};

export const toastMessages = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  promise: (promise, msgs) => toast.promise(promise, msgs),
};

export default ToastProvider;
