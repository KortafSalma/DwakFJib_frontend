import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, ShoppingCart, Calendar, MapPin, ChevronDown, Plus, Minus } from 'lucide-react';
import formatMAD from '../../utils/currency';

const QuickReservationWidget = ({ medications = [], onReserve }) => {
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(30);

  const displayMeds = medications.slice(0, 6);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {displayMeds.map((med) => (
          <motion.button
            key={med.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(selected?.id === med.id ? null : med)}
            className={`p-3 rounded-lg border text-left transition-all duration-150 ${
              selected?.id === med.id
                ? 'bg-brand-500/10 border-brand-500/30 shadow-[0_0_12px_rgba(20,184,166,0.1)]'
                : 'bg-elevated border-subtle hover:bg-elevated/80 hover:border-muted/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${selected?.id === med.id ? 'bg-brand-500/20' : 'bg-elevated'}`}>
                <Pill className={`w-3 h-3 ${selected?.id === med.id ? 'text-brand-400' : 'text-contrast-muted'}`} />
              </div>
              <span className="text-xs font-medium text-contrast-primary truncate">{med.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-brand-400">{formatMAD(med.price)}</span>
              <span className="text-[10px] text-contrast-muted truncate max-w-[70px]">{med.pharmacy}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-card border border-subtle space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-contrast-primary">{selected.name}</h4>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1 rounded hover:bg-elevated text-contrast-muted hover:text-contrast-primary transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-contrast-muted">
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-brand-400" /> {selected.pharmacy}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-brand-400" /> Pickup in 2-3 days</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-contrast-muted">Qty:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 10))}
                      className="w-7 h-7 rounded-lg bg-elevated border border-subtle text-contrast-muted hover:text-contrast-primary hover:bg-elevated/80 hover:border-muted/30 transition-all flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-mono text-contrast-primary w-8 text-center tabular-nums">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 10)}
                      className="w-7 h-7 rounded-lg bg-elevated border border-subtle text-contrast-muted hover:text-contrast-primary hover:bg-elevated/80 hover:border-muted/30 transition-all flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <span className="text-xs text-contrast-muted">
                  ≈ <span className="text-brand-400 font-semibold">{formatMAD(selected.price * (quantity / 30))}</span>
                </span>
              </div>
              <button
                onClick={() => { onReserve?.({ ...selected, quantity }); setSelected(null); }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-brand-500 to-brand-400 text-sm font-semibold text-white hover:shadow-[0_4px_16px_rgba(20,184,166,0.25)] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Reserve Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {displayMeds.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <ShoppingCart className="w-8 h-8 text-contrast-muted mb-2" />
          <p className="text-sm text-contrast-muted">No favorites yet</p>
          <p className="text-xs text-contrast-muted/60 mt-1">Add medications to favorites for quick reserve</p>
        </div>
      )}
    </div>
  );
};

export default QuickReservationWidget;