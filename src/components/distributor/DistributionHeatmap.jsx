import { motion } from 'framer-motion';

const DistributionHeatmap = ({ data = [] }) => {
  const regions = data.length > 0 ? data : [
    { region: 'Downtown', deliveries: 45, onTime: 42, revenue: 12500 },
    { region: 'Suburban North', deliveries: 32, onTime: 30, revenue: 8900 },
    { region: 'Suburban South', deliveries: 28, onTime: 26, revenue: 7200 },
    { region: 'Eastside', deliveries: 38, onTime: 35, revenue: 10800 },
    { region: 'Westside', deliveries: 22, onTime: 20, revenue: 6100 },
    { region: 'Airport Zone', deliveries: 15, onTime: 14, revenue: 4800 },
    { region: 'Industrial', deliveries: 18, onTime: 16, revenue: 5400 },
    { region: 'University', deliveries: 25, onTime: 24, revenue: 7100 },
  ];

  const maxDeliveries = Math.max(...regions.map((r) => r.deliveries));

  return (
    <div className="space-y-3">
      {regions.map((region, i) => {
        const onTimeRate = ((region.onTime / region.deliveries) * 100).toFixed(0);
        return (
          <motion.div
            key={region.region}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{region.region}</span>
              <div className="flex items-center gap-3 text-contrast-muted">
                <span>{region.deliveries} deliveries</span>
                <span className={onTimeRate >= 90 ? 'text-primary' : onTimeRate >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                  {onTimeRate}% on-time
                </span>
              </div>
            </div>
            <div className="flex gap-0.5 h-3 rounded-full overflow-hidden bg-dark/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(region.onTime / maxDeliveries) * 100}%` }}
                transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                className="bg-primary/60"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((region.deliveries - region.onTime) / maxDeliveries) * 100}%` }}
                transition={{ delay: i * 0.05 + 0.3, duration: 0.5 }}
                className="bg-yellow-400/40"
              />
            </div>
          </motion.div>
        );
      })}
      <div className="flex items-center gap-4 pt-2 text-[10px] text-contrast-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/60" /> On-Time</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400/40" /> Delayed</span>
      </div>
    </div>
  );
};

export default DistributionHeatmap;
