import { motion } from 'framer-motion';
import formatMAD from '../../utils/currency';

const UserGrowthChart = ({ data = [], dataKey = 'revenue', label = 'Metric', color = '#10B981' }) => {
  const maxValue = Math.max(...data.map((d) => d[dataKey]));
  const avgValue = data.reduce((sum, d) => sum + d[dataKey], 0) / data.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-contrast-secondary">Average {label}</p>
          <p className="text-xl font-bold">
            {dataKey === 'revenue' ? formatMAD(avgValue) : Math.round(avgValue).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs text-contrast-secondary">{label}</span>
        </div>
      </div>

      <div className="relative h-40">
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={`M 0,40 ${data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 40 - (d[dataKey] / maxValue) * 38;
              return `L ${x},${y}`;
            }).join(' ')} L 100,40 Z`}
            fill={`url(#gradient-${label})`}
          />

          <path
            d={`M 0,${40 - (data[0]?.[dataKey] / maxValue) * 38} ${data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 40 - (d[dataKey] / maxValue) * 38;
              return `L ${x},${y}`;
            }).join(' ')}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 40 - (d[dataKey] / maxValue) * 38;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="0"
                fill={color}
                initial={{ r: 0 }}
                animate={{ r: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex justify-between text-[10px] text-contrast-muted">
        {data.map((item) => (
          <span key={item.month} className="flex-1 text-center">{item.month}</span>
        ))}
      </div>
    </div>
  );
};

export default UserGrowthChart;
