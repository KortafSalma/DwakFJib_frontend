import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white shadow-sm hover:shadow-md hover:shadow-[#14B8A6]/20',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-[#14B8A6]/30 hover:shadow-sm',
    outline: 'bg-transparent border border-[#14B8A6]/30 text-[#14B8A6] hover:bg-[#14B8A6]/5',
    ghost: 'bg-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100',
    danger: 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300',
    success: 'bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300',
    brand: 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 hover:bg-[#14B8A6]/20',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-[10px] rounded-lg',
    sm: 'px-3.5 py-2 text-xs rounded-xl',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-sm rounded-2xl',
    xl: 'px-8 py-4 text-base rounded-2xl',
  };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
