import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Truck } from 'lucide-react';

const createDeliveryIcon = (status) => {
  const color = status === 'IN_TRANSIT' ? '#F59E0B' : status === 'DELIVERED' ? '#10B981' : '#6B7280';
  return L.divIcon({
    className: 'custom-delivery-marker',
    html: `
      <div class="relative">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h11l4 4v6a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="18" r="2.5"/><circle cx="16.5" cy="18" r="2.5"/></svg>
        </div>
        <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white animate-pulse" style="background-color: ${color}"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

const DeliveryMarker = ({ delivery }) => {
  const icon = createDeliveryIcon(delivery.status);

  return (
    <Marker position={[delivery.lat, delivery.lng]} icon={icon}>
      <Popup>
        <div className="p-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold">{delivery.driver}</span>
          </div>
          <p className="text-xs text-contrast-muted mt-1">Progress: {delivery.progress}%</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default DeliveryMarker;
