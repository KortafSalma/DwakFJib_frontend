import { motion } from 'framer-motion';
import { Calendar, Pill } from 'lucide-react';

const ExpiryWarningCard = ({ medications = [] }) => {
  const expiring = medications
    .filter((m) => m.expiryDate && m.status !== 'EXPIRED')
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
    .slice(0, 6);

  const getDaysUntilExpiry = (dateStr) => {
    const days = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getUrgencyColor = (days) => {
    if (days <= 0) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (days <= 30) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    if (days <= 90) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-primary bg-primary/10 border-primary/20';
  };

  return (
    <div className="space-y-2">
      {expiring.length === 0 ? (
        <div className="py-6 text-center">
          <Calendar className="w-8 h-8 text-primary/40 mx-auto mb-2" />
          <p className="text-sm text-contrast-muted">No medications expiring soon</p>
        </div>
      ) : (
        expiring.map((med, i) => {
          const days = getDaysUntilExpiry(med.expiryDate);
          const color = getUrgencyColor(days);
          return (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-dark/30 border border-primary/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Pill className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{med.name}</p>
                  <p className="text-[10px] text-contrast-muted">{med.expiryDate}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full border text-[10px] font-semibold ${color}`}>
                {days <= 0 ? 'EXPIRED' : `${days}d left`}
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default ExpiryWarningCard;
