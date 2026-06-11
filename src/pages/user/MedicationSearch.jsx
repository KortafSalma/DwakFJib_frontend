import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, SlidersHorizontal, Pill, MapPin, ShoppingCart,
  Heart, HeartPulse, Bug, Sparkles, Baby, FlaskConical,
  Stethoscope, ChevronLeft, ChevronRight, Package,
} from 'lucide-react';
import { useAddFavorite, useRemoveFavorite } from '../../hooks';
import { usePaginatedApi } from '../../hooks/usePaginatedApi';
import { userService } from '../../api';

const categories = [
  { label: 'All', value: '' },
  { label: 'Pain Relief', value: 'Pain Relief', icon: HeartPulse },
  { label: 'Antibiotics', value: 'Antibiotics', icon: Bug },
  { label: 'Vitamins', value: 'Vitamins', icon: Sparkles },
  { label: 'Baby Care', value: 'Baby Care', icon: Baby },
  { label: 'Skin Care', value: 'Skin Care', icon: FlaskConical },
  { label: 'Chronic Care', value: 'Chronic Care', icon: Stethoscope },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const getAvailability = (med) => {
  if (med.stock <= 0 || med.is_expired) return { label: 'Out of Stock', classes: 'bg-red-50 text-red-500 border-red-200' };
  if (med.is_low_stock) return { label: 'Limited Stock', classes: 'bg-amber-50 text-amber-600 border-amber-200' };
  return { label: 'In Stock', classes: 'bg-brand-50 text-brand-600 border-brand-200' };
};

const ResultCard = ({ med, isFav, onFavorite }) => {
  const availability = getAvailability(med);

  return (
    <motion.div
      variants={fadeUp}
      className="bg-card rounded-2xl border border-elevated p-5 sm:p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <Pill className="w-5 h-5 text-brand-500" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-contrast-primary truncate">{med.name}</h3>
            <p className="text-xs text-contrast-muted mt-0.5">{med.category}</p>
          </div>
        </div>
        <span className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${availability.classes}`}>
          {availability.label}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-contrast-muted mb-4">
        <span className="flex items-center gap-1 min-w-0">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{med.pharmacy}</span>
        </span>
        {med.distance && (
          <>
            <span className="text-contrast-muted">·</span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MapPin className="w-3 h-3" /> {med.distance}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-elevated">
        <div className="flex items-center gap-3">
          {med.price > 0 ? (
            <span className="text-lg font-bold text-contrast-primary">${med.price}</span>
          ) : (
            <span className="text-xs text-contrast-muted">Price N/A</span>
          )}
          <span className="text-[10px] text-contrast-muted">{med.dosage}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onFavorite?.(med.id, e)}
            className={`p-2 rounded-lg transition-all ${isFav ? 'text-red-400 bg-red-50' : 'text-contrast-muted hover:text-red-400 hover:bg-red-50'}`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
          <button
            disabled={availability.label === 'Out of Stock'}
            className={`h-9 px-4 rounded-xl text-xs font-medium transition-all inline-flex items-center gap-1.5 ${
              availability.label !== 'Out of Stock'
                ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm'
                : 'bg-elevated text-contrast-muted cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Reserve
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <div className="bg-card rounded-2xl border border-elevated p-5 sm:p-6 space-y-4 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-elevated" />
        <div className="space-y-2">
          <div className="h-4 bg-elevated rounded w-28" />
          <div className="h-3 bg-elevated rounded w-16" />
        </div>
      </div>
      <div className="h-5 bg-elevated rounded-full w-16" />
    </div>
    <div className="h-3 bg-elevated rounded w-40" />
    <div className="flex justify-between items-center pt-3 border-t border-elevated">
      <div className="h-6 bg-elevated rounded w-12" />
      <div className="flex gap-2">
        <div className="h-9 w-9 bg-elevated rounded-lg" />
        <div className="h-9 w-20 bg-elevated rounded-xl" />
      </div>
    </div>
  </div>
);

const MedicationSearch = () => {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  const {
    data: medications,
    loading,
    meta,
    setPage,
    setFilter,
    params,
  } = usePaginatedApi(
    (p) => {
      const searchQuery = p.query || '';
      const apiParams = {};
      if (p.category) apiParams.category = p.category;
      if (p.in_stock) apiParams.in_stock = p.in_stock;
      return userService.searchMedications(searchQuery, apiParams);
    },
    { query: '', page: 1 },
    { debounceMs: 400, autoFetch: false }
  );

  const { mutate: addFavorite } = useAddFavorite({ successMessage: 'Added to favorites', errorMessage: false });
  const { mutate: removeFavorite } = useRemoveFavorite({ successMessage: 'Removed from favorites', errorMessage: false });

  const handleSearch = useCallback((value) => {
    setQuery(value);
    setFilter('query', value);
  }, [setFilter]);

  const handleCategory = useCallback((cat) => {
    setActiveCategory(cat);
    setFilter('category', cat);
  }, [setFilter]);

  const handleInStockToggle = useCallback(() => {
    setFilter('in_stock', params.in_stock ? undefined : true);
  }, [setFilter, params.in_stock]);

  const toggleFavorite = async (id, e) => {
    e?.stopPropagation();
    if (favorites.has(id)) {
      await removeFavorite(id);
      setFavorites((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      await addFavorite(id);
      setFavorites((prev) => new Set([...prev, id]));
    }
  };

  const medList = (medications || []).map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category || 'General',
    price: m.price || 0,
    stock: m.stock || 0,
    pharmacy: m.pharmacy?.name || 'Unknown',
    distance: m.pharmacy?.distance || null,
    dosage: m.dosage || '',
    is_low_stock: m.is_low_stock || false,
    is_expired: m.is_expired || false,
  }));

  const hasQuery = !!params.query;
  const showResults = hasQuery && !loading && medList.length > 0;
  const showEmpty = hasQuery && !loading && medList.length === 0;
  const showInitial = !hasQuery && !loading;

  const activeFilters = [];
  if (params.category) activeFilters.push({ label: params.category, onRemove: () => handleCategory('') });
  if (params.in_stock) activeFilters.push({ label: 'In Stock Only', onRemove: handleInStockToggle });

  const totalPages = meta?.lastPage || 1;
  const currentPage = meta?.currentPage || 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Medication Search Results</h1>
          <p className="text-sm sm:text-base text-contrast-secondary mt-1.5">Find available medications across nearby pharmacies.</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-contrast-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search medications..."
              className="w-full h-14 sm:h-16 pl-14 pr-36 rounded-2xl border border-elevated bg-card text-base text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {query && (
                <button
                  type="button"
                  onClick={() => handleSearch('')}
                  className="text-xs text-contrast-muted hover:text-contrast-secondary transition-colors px-2"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`h-10 px-4 rounded-xl border text-sm font-medium transition-all inline-flex items-center gap-2 ${
                  showFilters
                    ? 'bg-brand-50 border-brand-200 text-brand-600'
                    : 'bg-card border-elevated text-contrast-secondary hover:border-muted'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8 lg:gap-10">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-24 space-y-6"
            >
              {/* Categories */}
              <div>
                <h4 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Category</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategory(cat.value)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === cat.value
                          ? 'bg-brand-50 text-brand-600'
                          : 'text-contrast-secondary hover:text-contrast-primary hover:bg-elevated'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Availability</h4>
                <button
                  onClick={handleInStockToggle}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    params.in_stock ? 'bg-brand-50 text-brand-600' : 'bg-elevated text-contrast-secondary hover:text-contrast-primary'
                  }`}
                >
                  <span>In Stock Only</span>
                  <div className={`w-8 h-4.5 rounded-full transition-colors relative ${params.in_stock ? 'bg-brand-500' : 'bg-elevated'}`}>
                    <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-card shadow-sm transition-all ${params.in_stock ? 'left-4' : 'left-0.5'}`} />
                  </div>
                </button>
              </div>

              {/* Reset */}
              {(params.category || params.in_stock) && (
                <button
                  onClick={() => { handleCategory(''); setFilter('in_stock', undefined); }}
                  className="text-sm text-brand-500 hover:text-brand-600 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden fixed inset-0 bg-black/30 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, x: -280 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -280 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                  className="lg:hidden fixed inset-y-0 left-0 w-[280px] bg-card z-50 shadow-2xl p-6 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-contrast-primary">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="p-1.5 rounded-lg hover:bg-elevated text-contrast-muted">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => { handleCategory(cat.value); }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                              activeCategory === cat.value
                                ? 'bg-brand-50 text-brand-600 border-brand-200'
                                : 'text-contrast-secondary border-elevated hover:border-muted'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Availability</h4>
                      <button
                        onClick={handleInStockToggle}
                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          params.in_stock ? 'bg-brand-50 text-brand-600' : 'bg-elevated text-contrast-secondary'
                        }`}
                      >
                        <span>In Stock Only</span>
                        <div className={`w-8 h-4.5 rounded-full transition-colors relative ${params.in_stock ? 'bg-brand-500' : 'bg-elevated'}`}>
                          <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-card shadow-sm transition-all ${params.in_stock ? 'left-4' : 'left-0.5'}`} />
                        </div>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full mt-8 h-11 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-all"
                  >
                    Apply filters
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Results Summary */}
            {hasQuery && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
              >
                <p className="text-sm text-contrast-secondary">
                  {loading ? 'Searching...' : (
                    <span><span className="font-semibold text-contrast-primary">{meta?.total || 0}</span> medications found</span>
                  )}
                </p>
                {(activeFilters.length > 0) && (
                  <div className="hidden sm:flex items-center gap-2">
                    {activeFilters.map((f) => (
                      <span key={f.label} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-[11px] font-medium text-brand-600">
                        {f.label}
                        <button onClick={f.onRemove} className="hover:text-brand-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Loading State */}
            {loading && (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
                {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
              </motion.div>
            )}

            {/* Results */}
            {showResults && (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
                {medList.map((med) => (
                  <ResultCard
                    key={med.id}
                    med={med}
                    isFav={favorites.has(med.id)}
                    onFavorite={toggleFavorite}
                  />
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {showEmpty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-card rounded-2xl border border-elevated"
              >
                <div className="w-16 h-16 rounded-2xl bg-elevated flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-contrast-muted" />
                </div>
                <h3 className="text-lg font-semibold text-contrast-primary">No medications found</h3>
                <p className="text-sm text-contrast-secondary mt-1.5 max-w-xs mx-auto">
                  Try adjusting your search or filters to find what you are looking for.
                </p>
              </motion.div>
            )}

            {/* Initial State */}
            {showInitial && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-card rounded-2xl border border-elevated"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-brand-500" />
                </div>
                <h3 className="text-lg font-semibold text-contrast-primary">Search for medications</h3>
                <p className="text-sm text-contrast-secondary mt-1.5 max-w-xs mx-auto">
                  Type a medication name above to find availability and prices near you.
                </p>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 pt-4"
              >
                <button
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="w-9 h-9 rounded-xl border border-elevated flex items-center justify-center text-contrast-muted hover:text-contrast-secondary hover:border-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setPage(page)}
                    className={`min-w-[36px] h-9 rounded-xl text-sm font-medium transition-all ${
                      page === currentPage
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'bg-card border border-elevated text-contrast-secondary hover:border-muted hover:text-contrast-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="w-9 h-9 rounded-xl border border-elevated flex items-center justify-center text-contrast-muted hover:text-contrast-secondary hover:border-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationSearch;
