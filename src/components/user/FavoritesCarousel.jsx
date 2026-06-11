import { motion } from 'framer-motion';
import { Pill, ShoppingCart } from 'lucide-react';
import formatMAD from '../../utils/currency';

const FavoritesCarousel = ({ favorites = [], onReserve, onRemove }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-body to-transparent z-10 pointer-events-none" />
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin pr-8">
        {favorites.map((med, i) => (
          <motion.div
            key={med.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            className="flex-shrink-0 w-56 p-4 rounded-xl bg-card backdrop-blur-xl border border-subtle hover:border-elevated transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                <Pill className="w-5 h-5 text-brand-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-contrast-primary truncate">{med.name}</h3>
                <p className="text-[10px] text-contrast-muted truncate">{med.category}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-contrast-primary">{formatMAD(med.price)}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                med.inStock ? 'bg-brand-500/10 text-brand-400 border-brand-500/20' : 'bg-red-400/10 text-red-400 border-red-400/20'
              }`}>
                {med.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onReserve?.(med)}
                disabled={!med.inStock}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  med.inStock
                    ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white hover:shadow-[0_4px_12px_rgba(20,184,166,0.2)]'
                    : 'bg-elevated text-contrast-muted cursor-not-allowed border border-subtle'
                }`}
              >
                <ShoppingCart className="w-3 h-3" />
                Reserve
              </button>
              <button
                onClick={() => onRemove?.(med.id)}
                className="px-2.5 py-2 rounded-lg bg-elevated text-contrast-muted text-xs hover:bg-red-400/10 hover:text-red-400 border border-subtle hover:border-red-400/20 transition-all"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Pill className="w-8 h-8 text-contrast-muted mb-2" />
          <p className="text-sm text-contrast-muted">No favorites yet</p>
          <p className="text-xs text-contrast-muted/60 mt-1">Browse pharmacies and save your favorites</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesCarousel;