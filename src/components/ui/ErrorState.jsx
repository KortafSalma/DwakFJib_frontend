import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorState = ({
  icon: Icon,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  actionLabel = 'Try Again',
  action,
  onRetry,
  onBack,
  fullPage = false,
  status,
}) => {
  const navigate = useNavigate();

  const statusConfig = {
    400: { title: 'Bad Request', description: 'The request could not be processed. Please check your input.', icon: AlertCircle },
    401: { title: 'Unauthorized', description: 'Please sign in to access this page.', icon: AlertCircle },
    403: { title: 'Access Denied', description: 'You do not have permission to view this page.', icon: AlertCircle },
    404: { title: 'Page Not Found', description: 'The page you are looking for does not exist or has been moved.', icon: AlertCircle },
     422: { title: 'Validation Error', description: 'The submitted data is invalid. Please check your input.', icon: AlertCircle },
     500: { title: 'Server Error', description: 'Our servers are experiencing issues. Please try again later.', icon: AlertCircle },
  };

  const config = status ? (statusConfig[status] || {}) : {};
  const IconComponent = Icon || config.icon || AlertCircle;
  const displayTitle = title || config.title || 'Something went wrong';
  const displayDescription = description || config.description || '';

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-5 shadow-inner">
        <IconComponent className="w-10 h-10 text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-700 mb-1.5">{displayTitle}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">{displayDescription}</p>
      <div className="flex items-center gap-3">
        {action || (
          <>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                {actionLabel || 'Try Again'}
              </button>
            )}
            {onBack && (
              <button
                onClick={() => { if (onBack === true) navigate(-1); else onBack(); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="max-w-md w-full">{content}</div>
      </div>
    );
  }

  return content;
};

export default ErrorState;
