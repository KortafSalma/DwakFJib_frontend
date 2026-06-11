import { motion } from 'framer-motion';
import { Pill, MapPin, ShoppingCart } from 'lucide-react';
import formatMAD from '../../utils/currency';

const PublicMedicationPreview = ({ medications = [], onReserve, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl bg-card/60 border border-primary/5 p-4 animate-pulse">
            <div className="h-4 w-24 bg-white/5 rounded mb-3" />
            <div className="h-3 w-16 bg-white/5 rounded mb-2" />
            <div className="h-6 w-12 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!medications.length) {
    return (
      <div className="text-center py-12">
        <Pill className="w-12 h-12 text-contrast-muted mx-auto mb-3" />
        <p className="text-contrast-muted text-sm">No medications found</p>
        <p className="text-contrast-muted text-xs mt-1">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {medications.map((med, i) => (
        <motion.div
          key={med.id || i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group relative rounded-xl bg-card/60 backdrop-blur-sm border border-primary/5 hover:border-primary/20 transition-all p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                  {med.name}
                </h4>
                <span className="text-[10px] text-contrast-muted uppercase tracking-wider">
                  {med.category || 'General'}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-contrast-secondary">
              {formatMAD(med.price || 0)}
            </span>
          </div>

          {med.description && (
            <p className="text-xs text-contrast-muted mb-3 line-clamp-2">{med.description}</p>
          )}

          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3 h-3 text-contrast-muted" />
            <span className="text-xs text-contrast-secondary">{med.pharmacy || 'Multiple pharmacies'}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${med.inStock ? 'bg-primary' : 'bg-red-500'}`} />
              <span className="text-xs text-contrast-muted">
                {med.inStock ? `${med.stock || 'In'} stock` : 'Out of stock'}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onReserve?.(med)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-all"
            >
              <ShoppingCart className="w-3 h-3" />
              Reserve
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PublicMedicationPreview;
