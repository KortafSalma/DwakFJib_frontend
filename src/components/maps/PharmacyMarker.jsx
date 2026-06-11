import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Star, Clock, Phone } from 'lucide-react';

const createPharmacyIcon = (open) => {
  return L.divIcon({
    className: 'custom-pharmacy-marker',
    html: `
      <div class="relative">
        <div class="w-10 h-10 rounded-full ${open ? 'bg-gradient-to-br from-emerald-400 to-cyan-400' : 'bg-gray-500'} flex items-center justify-center shadow-lg border-2 border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
        </div>
        ${open ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>' : ''}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

const PharmacyMarker = ({ pharmacy }) => {
  const lat = pharmacy.latitude ?? pharmacy.lat;
  const lng = pharmacy.longitude ?? pharmacy.lng;

  if (lat == null || lng == null) {
    console.warn('[PharmacyMarker] Missing coordinates for:', pharmacy);
    return null;
  }

  const icon = createPharmacyIcon(pharmacy.open);

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup className="custom-popup">
        <div className="p-3 min-w-[200px]">
          <h3 className="text-sm font-bold mb-1">{pharmacy.name}</h3>
          <div className="space-y-1 text-xs text-contrast-muted">
            <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {pharmacy.address}</div>
            <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pharmacy.hours}</div>
            <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {pharmacy.phone}</div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" /> {pharmacy.rating}
              <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold ${pharmacy.open ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {pharmacy.open ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default PharmacyMarker;
