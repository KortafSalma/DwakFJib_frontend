import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      type = 'text',
      className = '',
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-slate-600">{label}</label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          )}
          <input
            type={type}
            ref={ref}
            placeholder={placeholder}
            className={`w-full rounded-2xl border bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 ${
              Icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                : 'border-slate-200 focus:border-[#14B8A6]/50 focus:ring-[#14B8A6]/20'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
