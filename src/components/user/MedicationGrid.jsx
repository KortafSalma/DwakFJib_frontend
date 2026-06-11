import { motion } from 'framer-motion';
import { Pill, Star, MapPin, Heart, ShoppingCart } from 'lucide-react';
import formatMAD from '../../utils/currency';

const MedicationGrid = ({ medications = [], onReserve, onFavorite, isFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {medications.map((med, i) => (
        <motion.div
          key={med.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -2 }}
          className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10 hover:border-primary/20 transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
              <Pill className="w-5 h-5 text-primary" />
            </div>
            <button
              onClick={() => onFavorite?.(med.id)}
              className={`p-1.5 rounded-lg transition-all ${isFavorite?.(med.id) ? 'text-red-400 bg-red-400/10' : 'text-contrast-muted hover:text-red-400'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite?.(med.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <h3 className="text-sm font-semibold mb-1">{med.name}</h3>
          <p className="text-[10px] text-contrast-muted mb-2">{med.category}</p>

          <div className="flex items-center gap-2 text-[10px] text-contrast-secondary mb-3">
            <MapPin className="w-3 h-3" />
            <span>{med.pharmacy} · {med.distance}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">{med.rating}</span>
            </div>
            <span className="text-sm font-bold">{formatMAD(med.price)}</span>
          </div>

          <button
            onClick={() => onReserve?.(med)}
            disabled={!med.inStock}
            className={`w-full mt-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
              med.inStock
                ? 'bg-gradient-to-r from-primary to-secondary text-dark hover:opacity-90'
                : 'bg-gray-600/20 text-contrast-muted cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            {med.inStock ? 'Reserve' : 'Out of Stock'}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default MedicationGrid;
