import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const FormWrapper = ({
  children,
  title,
  description,
  onSubmit,
  submitting = false,
  submitLabel = 'Submit',
  successMessage,
  errorMessage,
  icon: Icon,
  className = '',
  footer,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-lg mx-auto ${className}`}
    >
      <div className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        {(title || Icon) && (
          <div className="p-6 pb-0 text-center">
            {Icon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-14 h-14 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3"
              >
                <Icon className="w-7 h-7 text-primary" />
              </motion.div>
            )}
            {title && <h2 className="text-xl font-bold text-contrast-primary">{title}</h2>}
            {description && <p className="text-sm text-contrast-secondary mt-1">{description}</p>}
          </div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mx-6 mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2 text-sm text-primary"
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            {successMessage}
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mx-6 mt-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMessage}
          </motion.div>
        )}

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {children}

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                  </motion.div>
                  Processing...
                </>
              ) : (
                submitLabel
              )}
            </motion.button>
          </div>
        </form>

        {footer && (
          <div className="px-6 py-4 border-t border-white/10 text-center text-sm text-contrast-secondary">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FormWrapper;
