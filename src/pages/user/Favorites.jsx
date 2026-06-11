import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search } from 'lucide-react';
import DashboardSection from '../../components/ui/DashboardSection';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';
import { useFavorites, useRemoveFavorite } from '../../hooks';

const Favorites = () => {
  const [search, setSearch] = useState('');

  const { data: favoritesData, loading, refetch } = useFavorites({ page: 1, per_page: 50 });
  const { mutate: removeFavorite } = useRemoveFavorite({
    successMessage: 'Removed from favorites',
    onSuccess: () => refetch(),
  });

  const favorites = (favoritesData?.data || favoritesData || []).map((f) => ({
    id: f.id,
    name: f.name,
    address: f.address,
    city: f.city,
    rating: f.rating || 0,
    medications_count: f.medications_count || 0,
    latitude: f.latitude,
    longitude: f.longitude,
  }));

  const filtered = favorites.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = async (id) => {
    await removeFavorite(id);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Favorites</h1>
          <p className="text-sm text-contrast-secondary">
            {loading ? '...' : `${favorites.length} saved pharmacies`}
          </p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search favorites..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
        />
      </div>

      <DashboardSection title="Saved Pharmacies" subtitle={`${filtered.length} items`}>
        <Card>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <Heart className="w-12 h-12 text-contrast-muted mx-auto mb-3" />
              <p className="text-sm text-contrast-secondary">No favorites found</p>
              <p className="text-xs text-contrast-muted mt-1">Browse pharmacies and save your favorites</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-elevated transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {pharmacy.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{pharmacy.name}</p>
                      <p className="text-xs text-contrast-secondary">{pharmacy.city} · ★ {pharmacy.rating}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(pharmacy.id)}
                    className="p-2 rounded-lg hover:bg-red-400/10 text-contrast-secondary hover:text-red-400 transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </DashboardSection>
    </motion.div>
  );
};

export default Favorites;
