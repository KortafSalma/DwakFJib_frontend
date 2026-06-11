import { motion } from 'framer-motion';
import { MapPin, Route, Clock } from 'lucide-react';

const RouteMapPreview = ({ routes = [] }) => {
  const displayRoutes = routes.length > 0 ? routes : [
    { id: 'R-001', name: 'Central → Downtown', stops: 4, distance: '12.5km', estimatedTime: '45min', status: 'active' },
    { id: 'R-002', name: 'North → Suburban', stops: 3, distance: '18.2km', estimatedTime: '1h 10min', status: 'active' },
    { id: 'R-003', name: 'South → Mall', stops: 5, distance: '22.8km', estimatedTime: '1h 30min', status: 'planned' },
    { id: 'R-004', name: 'Central → Airport', stops: 2, distance: '35.0km', estimatedTime: '55min', status: 'planned' },
  ];

  const statusColors = {
    active: 'text-primary',
    planned: 'text-yellow-400',
    completed: 'text-contrast-secondary',
  };

  return (
    <div className="space-y-3">
      <div className="relative h-40 rounded-xl bg-dark/30 border border-primary/5 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 160">
            <path d="M50,120 Q100,40 150,80 T250,60 T350,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <circle cx="50" cy="120" r="4" className="fill-primary" />
            <circle cx="150" cy="80" r="4" className="fill-secondary" />
            <circle cx="250" cy="60" r="4" className="fill-yellow-400" />
            <circle cx="350" cy="100" r="4" className="fill-primary" />
          </svg>
        </div>
        <div className="flex items-center gap-4 text-xs text-contrast-muted">
          <MapPin className="w-4 h-4" />
          <span>Route Visualization</span>
        </div>
      </div>

      {displayRoutes.map((route, i) => (
        <motion.div
          key={route.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-3 rounded-lg bg-dark/30 border border-primary/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Route className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{route.name}</p>
              <div className="flex items-center gap-3 text-[10px] text-contrast-muted">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {route.stops} stops</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {route.estimatedTime}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-xs font-semibold ${statusColors[route.status]}`}>{route.status}</p>
            <p className="text-[10px] text-contrast-muted">{route.distance}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RouteMapPreview;
