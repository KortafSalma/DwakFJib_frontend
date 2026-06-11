const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    primary: 'bg-[#14B8A6]/10 text-[#14B8A6]',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-red-50 text-red-600',
    info: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    brand: 'bg-[#14B8A6]/10 text-[#14B8A6] font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
