import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cpu, HardDrive, Activity } from 'lucide-react';

const SystemHealthWidget = () => {
  const [metrics, setMetrics] = useState({
    cpu: 23,
    memory: 67,
    disk: 45,
    uptime: 99.97,
    requests: 1247,
    latency: 42,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        requests: prev.requests + Math.floor(Math.random() * 20),
        latency: Math.max(10, Math.min(200, prev.latency + (Math.random() - 0.5) * 20)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, thresholds) => {
    if (value <= thresholds.good) return 'text-primary';
    if (value <= thresholds.warn) return 'text-yellow-400';
    return 'text-red-400';
  };

  const items = [
    { icon: Cpu, label: 'CPU Usage', value: `${Math.round(metrics.cpu)}%`, color: getStatusColor(metrics.cpu, { good: 60, warn: 80 }) },
    { icon: HardDrive, label: 'Memory', value: `${Math.round(metrics.memory)}%`, color: getStatusColor(metrics.memory, { good: 70, warn: 85 }) },
    { icon: Database, label: 'Disk', value: `${metrics.disk}%`, color: 'text-primary' },
    { icon: Server, label: 'Uptime', value: `${metrics.uptime}%`, color: 'text-primary' },
    { icon: Activity, label: 'Requests/min', value: metrics.requests.toLocaleString(), color: 'text-secondary' },
    { icon: Activity, label: 'Latency', value: `${Math.round(metrics.latency)}ms`, color: getStatusColor(metrics.latency, { good: 100, warn: 300 }) },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-2.5 rounded-lg bg-dark/30 border border-primary/5"
        >
          <div className="flex items-center gap-2.5">
            <item.icon className="w-4 h-4 text-contrast-muted" />
            <span className="text-xs text-contrast-secondary">{item.label}</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${item.color}`}>{item.value}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default SystemHealthWidget;
