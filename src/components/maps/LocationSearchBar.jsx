import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';

const LocationSearchBar = ({ onSearch, pharmacies = [] }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 2) {
      const filtered = pharmacies.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.address.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      onSearch?.(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search pharmacies or addresses..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-card/95 backdrop-blur-md border border-primary/10 text-sm text-white placeholder-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); }} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-contrast-muted" />
          </button>
        )}
      </div>

      {focused && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-card/95 backdrop-blur-md border border-primary/10 shadow-xl z-[1000]"
        >
          {results.map((pharmacy) => (
            <button
              key={pharmacy.id}
              onMouseDown={() => { setQuery(pharmacy.name); setResults([]); }}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-left"
            >
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">{pharmacy.name}</p>
                <p className="text-[10px] text-contrast-muted">{pharmacy.address}</p>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LocationSearchBar;
