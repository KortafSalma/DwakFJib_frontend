import { motion } from 'framer-motion';
import { Search, Pill, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchHero = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500/10 via-elevated to-brand-400/5 border border-subtle p-8"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-400/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl" />

      <div className="absolute top-6 right-12 opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-16 opacity-15">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
          <Sparkles className="w-3 h-3 text-brand-400" />
          <span className="text-[11px] font-medium text-brand-400">Quick Search</span>
        </div>

        <h2 className="text-xl font-bold text-contrast-primary mb-1">Find Your Medication</h2>
        <p className="text-sm text-contrast-secondary mb-5">Search across all partner pharmacies for availability and pricing</p>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted group-focus-within:text-brand-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by name, category, or symptom..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-elevated border border-subtle text-sm text-contrast-primary placeholder-contrast-muted focus:outline-none focus:border-brand-500/40 transition-all"
              onChange={(e) => onSearch?.(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/user/search')}
            />
          </div>
          <button
            onClick={() => navigate('/user/search')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-sm font-semibold text-white hover:shadow-[0_4px_20px_rgba(20,184,166,0.3)] transition-all flex items-center gap-2"
          >
            <Pill className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchHero;