import { motion } from 'framer-motion';
import { Pill, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import formatMAD from '../../utils/currency';

const statusConfig = {
  IN_STOCK: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: CheckCircle },
  LOW_STOCK: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: AlertTriangle },
  OUT_OF_STOCK: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: XCircle },
  RESERVED: { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20', icon: Clock },
  EXPIRED: { color: 'text-contrast-secondary', bg: 'bg-gray-400/10', border: 'border-gray-400/20', icon: XCircle },
};

const MedicationCard = ({ medication, onClick }) => {
  const config = statusConfig[medication.status] || statusConfig.IN_STOCK;
  const StatusIcon = config.icon;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => onClick?.(medication)}
      className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10 hover:border-primary/20 cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
            <Pill className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{medication.name}</h3>
            <p className="text-[10px] text-contrast-muted">{medication.category}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${config.color} ${config.bg} ${config.border}`}>
          <StatusIcon className="w-3 h-3" />
          {medication.status.replace('_', ' ')}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-dark/30">
          <p className="text-xs font-bold">{medication.stock}</p>
          <p className="text-[9px] text-contrast-muted">Stock</p>
        </div>
        <div className="p-2 rounded-lg bg-dark/30">
          <p className="text-xs font-bold">{formatMAD(medication.price)}</p>
          <p className="text-[9px] text-contrast-muted">Price</p>
        </div>
        <div className="p-2 rounded-lg bg-dark/30">
          <p className="text-xs font-bold">{medication.reservations || 0}</p>
          <p className="text-[9px] text-contrast-muted">Reserved</p>
        </div>
      </div>

      {medication.expiryDate && (
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-contrast-muted">
          <Clock className="w-3 h-3" />
          Expires: {medication.expiryDate}
        </div>
      )}
    </motion.div>
  );
};

export default MedicationCard;
