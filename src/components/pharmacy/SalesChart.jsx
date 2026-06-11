import { motion } from 'framer-motion';

const SalesChart = ({ data = [], color = '#10B981' }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-1.5 h-32">
        {data.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
            className="flex-1 group relative"
          >
            <div
              className="w-full rounded-t transition-all cursor-pointer"
              style={{
                height: '100%',
                background: `linear-gradient(to top, ${color}40, ${color}20)`,
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-card border border-primary/10 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ${item.value.toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-contrast-muted">
        {data.map((item) => (
          <span key={item.label} className="flex-1 text-center">{item.label}</span>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;
