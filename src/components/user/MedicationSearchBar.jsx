import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

const categories = ['All', 'Antibiotics', 'Diabetes', 'Cardiology', 'Pain Relief', 'Gastro', 'Neurology', 'Psychiatry'];

const MedicationSearchBar = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setQuery(value);
    onSearch?.(value);
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    onFilter?.(cat);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search medications..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-dark/50 border border-primary/10 text-sm text-white placeholder-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {query && (
            <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-contrast-muted" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-lg border transition-all ${showFilters ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-dark/50 border-primary/10 text-contrast-secondary'}`}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-contrast-secondary border border-transparent hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MedicationSearchBar;
