import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Pill, TrendingUp, Ambulance, Sparkles, ArrowRight } from 'lucide-react';

const trending = [
  'Amoxicillin', 'Paracetamol', 'Ibuprofen', 'Omeprazole', 'Metformin',
];

const PublicSearchHero = ({ onSearch, onEmergency }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch?.(query.trim());
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-dark to-secondary/5" />
      <div className="absolute top-10 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Healthcare Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="text-gradient">
              Find Medications
            </span>
            <br />
            <span className="text-white">Near You</span>
          </h1>

          <p className="text-base sm:text-lg text-contrast-secondary max-w-2xl mx-auto mb-8">
            Search, compare, and reserve medications from nearby pharmacies. No account needed to browse.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-card/60 backdrop-blur-md border border-primary/10 rounded-2xl overflow-hidden focus-within:border-primary/30 transition-all">
                <Search className="absolute left-5 w-5 h-5 text-contrast-secondary" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by medication name, category, or symptom..."
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-sm text-white placeholder-contrast-muted focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mr-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark text-sm font-medium shadow-glow flex items-center gap-2"
                >
                  <Pill className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </motion.button>
              </div>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-contrast-muted">Trending:</span>
            {trending.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuery(item);
                  onSearch?.(item);
                }}
                className="px-3 py-1 rounded-full bg-elevated border border-subtle text-xs text-contrast-secondary hover:text-white hover:border-primary/30 transition-all"
              >
                {item}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEmergency}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
          >
            <Ambulance className="w-4 h-4" />
            Emergency Medication Availability
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PublicSearchHero;
