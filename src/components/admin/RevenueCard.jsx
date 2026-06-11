import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp } from 'lucide-react';
import formatMADShort from '../../utils/currency';

const RevenueCard = ({ data }) => {
  const [period, setPeriod] = useState('monthly');
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="text-2xl font-bold">{formatMADShort(data.total || 124500)}</span>
        </div>
        <div className="flex items-center gap-1 text-primary text-sm">
          <TrendingUp className="w-4 h-4" />
          +22.1%
        </div>
      </div>

      <div className="flex gap-2">
        {['weekly', 'monthly', 'yearly'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              period === p ? 'bg-primary/10 text-primary border border-primary/20' : 'text-contrast-muted hover:text-contrast-secondary'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-1.5 h-32">
        {data.map((item, i) => (
          <motion.div
            key={item.month}
            initial={{ height: 0 }}
            animate={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
            className="flex-1 group relative"
          >
            <div
              className="w-full rounded-t bg-gradient-to-t from-primary/60 to-primary/20 hover:from-primary hover:to-primary/40 transition-all cursor-pointer"
              style={{ height: '100%' }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-card border border-primary/10 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {formatMADShort(item.revenue)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-contrast-muted">
        {data.map((item) => (
          <span key={item.month} className="flex-1 text-center">{item.month}</span>
        ))}
      </div>
    </div>
  );
};

export default RevenueCard;
