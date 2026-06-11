import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const DeliveryPerformanceWidget = ({ data }) => {
  const metrics = [
    { label: 'On-Time Rate', value: data?.onTimeRate || '94.5%', change: data?.onTimeChange || 2.3, icon: CheckCircle },
    { label: 'Avg Delivery Time', value: data?.avgTime || '2.4h', change: data?.timeChange || -0.3, icon: Clock },
    { label: 'Success Rate', value: data?.successRate || '98.2%', change: data?.successChange || 1.1, icon: TrendingUp },
    { label: 'Delayed Shipments', value: data?.delayed || 8, change: data?.delayedChange || -3, icon: AlertTriangle },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10"
        >
          <div className="flex items-center justify-between mb-2">
            <m.icon className="w-4 h-4 text-contrast-muted" />
            <span className={`text-[10px] font-semibold flex items-center gap-1 ${m.change >= 0 ? 'text-primary' : 'text-red-400'}`}>
              {m.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(m.change)}%
            </span>
          </div>
          <p className="text-lg font-bold">{m.value}</p>
          <p className="text-[10px] text-contrast-muted">{m.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DeliveryPerformanceWidget;
