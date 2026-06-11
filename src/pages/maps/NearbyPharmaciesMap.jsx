import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import DashboardSection from '../../components/ui/DashboardSection';
import Card from '../../components/ui/Card';
import InteractiveMap from '../../components/maps/InteractiveMap';
import PharmacyMarker from '../../components/maps/PharmacyMarker';
import NearbyPharmacyList from '../../components/maps/NearbyPharmacyList';
import FloatingMapControls from '../../components/maps/FloatingMapControls';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import { usePaginatedApi } from '../../hooks/usePaginatedApi';
import { getCurrentLocation, mockGeolocation, mapService } from '../../api/maps';

const NearbyPharmaciesMap = () => {
  const [, setSelectedPharmacy] = useState(null);
  const [filter, setFilter] = useState('all');
  const [location, setLocation] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const {
    data: pharmacies,
    loading,
    meta,
    error,
    setFilter: setApiFilter,
  } = usePaginatedApi(
    (params) => {
      if (!location) return Promise.resolve({ data: { data: [] } });
      return mapService.getAllPharmacies({
        lat: location.lat,
        lng: location.lng,
        radius: params.radius || 50,
        ...params,
      }).catch((err) => {
        console.error('[NearbyPharmaciesMap] API error:', err);
        setFetchError(err?.message || 'Failed to fetch pharmacies');
        return { data: { data: [] } };
      });
    },
    { page: 1, radius: 50 },
    { autoFetch: !!location }
  );

  useEffect(() => {
    getCurrentLocation().then((loc) => {
      console.log('[NearbyPharmaciesMap] Location resolved:', loc);
      setLocation(loc);
    });
  }, []);

  useEffect(() => {
    if (error) {
      console.error('[NearbyPharmaciesMap] API error:', error);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFetchError(error?.message || 'Failed to fetch pharmacies');
    }
  }, [error]);

  const handleFilter = (type) => {
    setFilter(type);
    if (type === 'open') {
      setApiFilter('open', true);
    } else if (type === 'emergency') {
      setApiFilter('emergency', true);
    } else {
      setApiFilter('open', undefined);
      setApiFilter('emergency', undefined);
    }
  };

  const pharmacyList = (pharmacies || []).map((p) => {
    const lat = parseFloat(p.latitude) || parseFloat(p.lat) || 0;
    const lng = parseFloat(p.longitude) || parseFloat(p.lng) || 0;
    if (!lat || !lng) {
      console.warn('[NearbyPharmaciesMap] Pharmacy missing coords:', p.name, p);
    }
    return {
      id: p.id,
      name: p.name,
      address: p.address,
      city: p.city,
      latitude: lat,
      longitude: lng,
      lat: lat,
      lng: lng,
      open: p.is_open !== false,
      emergency: p.is_emergency || false,
      rating: p.rating || 0,
      distance: p.distance,
      phone: p.phone,
    };
  });

  const mapCenter = location
    ? [location.lat, location.lng]
    : [mockGeolocation.lat, mockGeolocation.lng];

  if (fetchError) {
    console.warn('[NearbyPharmaciesMap] Fallback to mock data due to API error:', fetchError);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Nearby Pharmacies</h1>
          <p className="text-sm text-contrast-secondary">Find pharmacies near your location</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark/50 border border-white/10">
          <MapPin className="w-4 h-4 text-contrast-secondary" />
          <span className="text-xs text-contrast-secondary">
            {loading ? '...' : `${meta?.total || pharmacyList.length} locations`}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'open', label: 'Open Now' },
          { key: 'emergency', label: 'Emergency' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === tab.key
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-contrast-secondary hover:text-contrast-primary hover:bg-elevated border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="h-[500px] relative">
              {loading ? (
                <div className="h-full flex items-center justify-center bg-dark/50">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <InteractiveMap center={mapCenter} zoom={12} className="h-full">
                  {pharmacyList.map((pharmacy) => (
                    <PharmacyMarker key={pharmacy.id} pharmacy={pharmacy} />
                  ))}
                </InteractiveMap>
              )}
              <FloatingMapControls />
            </div>
          </Card>
        </div>
        <div>
          <DashboardSection title="Pharmacies" subtitle={`${pharmacyList.length} found`}>
            <Card>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : pharmacyList.length === 0 ? (
                <EmptyState icon={MapPin} title="No pharmacies found" description="Try expanding your search radius" />
              ) : (
                <NearbyPharmacyList pharmacies={pharmacyList} onSelect={setSelectedPharmacy} />
              )}
            </Card>
          </DashboardSection>
        </div>
      </div>
    </motion.div>
  );
};

export default NearbyPharmaciesMap;
