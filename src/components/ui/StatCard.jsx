import { motion } from 'framer-motion';

const colorVariants = {
  primary: { icon: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
  secondary: { icon: 'text-[#0F766E]', bg: 'bg-[#0F766E]/10' },
  red: { icon: 'text-red-500', bg: 'bg-red-50' },
  yellow: { icon: 'text-amber-500', bg: 'bg-amber-50' },
  blue: { icon: 'text-blue-500', bg: 'bg-blue-50' },
  emerald: { icon: 'text-emerald-500', bg: 'bg-emerald-50' },
  violet: { icon: 'text-violet-500', bg: 'bg-violet-50' },
  slate: { icon: 'text-slate-500', bg: 'bg-slate-50' },
};

const StatCard = ({ icon: Icon, label, value, change, color = 'primary', className = '' }) => {
  const c = colorVariants[color] || colorVariants.primary;

  return (
    <div className={`bg-card rounded-2xl border border-subtle shadow-card p-5 hover:shadow-card-hover hover:border-subtle transition-all ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-contrast-secondary uppercase tracking-wider">{label}</p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-contrast-primary mt-1.5 tracking-tight"
          >
            {value}
          </motion.p>
          {change !== undefined && (
            <p className={`text-xs font-semibold mt-1.5 flex items-center gap-0.5 ${
              change >= 0 ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 ml-3`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
