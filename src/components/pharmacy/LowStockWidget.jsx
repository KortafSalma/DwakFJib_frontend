import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const LowStockWidget = ({ medications = [] }) => {
  const lowStock = medications.filter((m) => m.status === 'LOW_STOCK' || m.status === 'OUT_OF_STOCK');

  if (lowStock.length === 0) {
    return (
      <div className="py-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
          <AlertTriangle className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-contrast-secondary">All medications are well stocked</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {lowStock.slice(0, 5).map((med, i) => (
        <motion.div
          key={med.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-3 rounded-lg bg-dark/30 border border-primary/5"
        >
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${med.status === 'OUT_OF_STOCK' ? 'bg-red-400' : 'bg-yellow-400'}`} />
            <div>
              <p className="text-sm font-medium">{med.name}</p>
              <p className="text-[10px] text-contrast-muted">{med.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-bold ${med.status === 'OUT_OF_STOCK' ? 'text-red-400' : 'text-yellow-400'}`}>
              {med.stock}
            </p>
            <p className="text-[10px] text-contrast-muted">remaining</p>
          </div>
        </motion.div>
      ))}
      {lowStock.length > 5 && (
        <p className="text-center text-xs text-contrast-muted pt-2">+{lowStock.length - 5} more</p>
      )}
    </div>
  );
};

export default LowStockWidget;
