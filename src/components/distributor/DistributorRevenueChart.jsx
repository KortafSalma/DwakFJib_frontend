import { motion } from 'framer-motion';

const DistributorRevenueChart = ({ data = [] }) => {
  const displayData = data.length > 0 ? data : [
    { label: 'Jan', value: 18500 },
    { label: 'Feb', value: 21200 },
    { label: 'Mar', value: 19800 },
    { label: 'Apr', value: 24500 },
    { label: 'May', value: 28200 },
    { label: 'Jun', value: 26800 },
  ];

  const maxValue = Math.max(...displayData.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 h-36">
        {displayData.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            className="flex-1 group relative"
          >
            <div
              className="w-full rounded-t transition-all cursor-pointer"
              style={{
                height: '100%',
                background: `linear-gradient(to top, #10B98140, #10B98120)`,
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-card border border-primary/10 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ${item.value.toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-contrast-muted">
        {displayData.map((item) => (
          <span key={item.label} className="flex-1 text-center">{item.label}</span>
        ))}
      </div>
    </div>
  );
};

export default DistributorRevenueChart;
