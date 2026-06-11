import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wifi, WifiOff } from 'lucide-react';

const RealtimeStatusWidget = ({ stats }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('Just now');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(`${Math.floor(Math.random() * 5) + 1}s ago`);
      setIsConnected(Math.random() > 0.05);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = stats || {
    activeNotifications: 3,
    pendingReservations: 2,
    activeDeliveries: 1,
    criticalAlerts: 1,
    systemHealth: 98.5,
  };

  return (
    <div className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold">Realtime Status</h3>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="w-4 h-4 text-primary" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-[10px] font-medium ${isConnected ? 'text-primary' : 'text-red-400'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Active Alerts', value: data.activeNotifications, color: 'text-yellow-400' },
          { label: 'Pending', value: data.pendingReservations, color: 'text-primary' },
          { label: 'Deliveries', value: data.activeDeliveries, color: 'text-secondary' },
          { label: 'Critical', value: data.criticalAlerts, color: 'text-red-400' },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-[10px] text-contrast-muted">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-primary/10">
        <span className="text-[10px] text-contrast-muted">System Health</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 rounded-full bg-dark/30 overflow-hidden">
            <motion.div
              animate={{ width: `${data.systemHealth}%` }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
          <span className="text-[10px] font-semibold text-primary">{data.systemHealth}%</span>
        </div>
      </div>
      <p className="text-[10px] text-contrast-muted text-center mt-2">Last update: {lastUpdate}</p>
    </div>
  );
};

export default RealtimeStatusWidget;
