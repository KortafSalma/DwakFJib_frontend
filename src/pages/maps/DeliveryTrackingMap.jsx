import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import Card from '../../components/ui/Card';
import InteractiveMap from '../../components/maps/InteractiveMap';
import DeliveryMarker from '../../components/maps/DeliveryMarker';
import RoutePolyline from '../../components/maps/RoutePolyline';
import LiveTrackingPanel from '../../components/maps/LiveTrackingPanel';
import RouteDetailsCard from '../../components/maps/RouteDetailsCard';
import FloatingMapControls from '../../components/maps/FloatingMapControls';
import { mockDeliveryRoute } from '../../mock/mapData';

const DeliveryTrackingMap = () => {
  const [deliveryPosition, setDeliveryPosition] = useState({
    lat: mockDeliveryRoute.origin.lat,
    lng: mockDeliveryRoute.origin.lng,
    progress: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryPosition((prev) => {
        const newProgress = Math.min(prev.progress + 2, mockDeliveryRoute.progress);
        const lat = mockDeliveryRoute.origin.lat + (mockDeliveryRoute.destination.lat - mockDeliveryRoute.origin.lat) * (newProgress / 100);
        const lng = mockDeliveryRoute.origin.lng + (mockDeliveryRoute.destination.lng - mockDeliveryRoute.origin.lng) * (newProgress / 100);
        return { lat, lng, progress: newProgress };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const routePositions = mockDeliveryRoute.checkpoints.map((cp) => [cp.lat, cp.lng]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Delivery Tracking</h1>
          <p className="text-sm text-contrast-secondary">Real-time shipment monitoring</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-white/20">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="h-[500px] relative">
              <InteractiveMap center={[40.7150, -74.0000]} zoom={14} className="h-full">
                <RoutePolyline positions={routePositions} color="#10B981" weight={4} />
                <DeliveryMarker delivery={{ ...deliveryPosition, driver: mockDeliveryRoute.driver, status: 'IN_TRANSIT' }} />
              </InteractiveMap>
              <FloatingMapControls />
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <LiveTrackingPanel delivery={{ ...mockDeliveryRoute, progress: deliveryPosition.progress }} />
          <RouteDetailsCard route={mockDeliveryRoute} />
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryTrackingMap;
