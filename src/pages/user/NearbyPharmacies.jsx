import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowUpRight } from 'lucide-react';

import { mockPharmacies } from '../../mock/userData';

const NearbyPharmacies = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockPharmacies.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'open' && p.open) || (filter === 'closed' && !p.open);
    return matchesSearch && matchesFilter;
  });

  const statsCards = [
    { label: 'Total Locations', value: mockPharmacies.length },
    { label: 'Open Now', value: mockPharmacies.filter((p) => p.open).length },
    { label: 'Closed', value: mockPharmacies.filter((p) => !p.open).length },
    { label: 'Avg Rating', value: (mockPharmacies.reduce((s, p) => s + p.rating, 0) / mockPharmacies.length).toFixed(1) },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center shadow-lg shadow-[#14B8A6]/20">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Nearby Pharmacies</h1>
              <p className="text-sm text-slate-500 mt-0.5">Find pharmacies near your location</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <MapPin className="w-4 h-4 text-[#14B8A6]" />
          <span className="text-xs font-semibold text-slate-600">{mockPharmacies.length} locations</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statsCards.map((stat, i) => (
          <motion.div
            key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <p className="text-[11px] text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'open', label: 'Open Now' },
            { key: 'closed', label: 'Closed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === tab.key
                  ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white border border-slate-200 bg-white shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((pharmacy, idx) => (
          <motion.div
            key={pharmacy.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{pharmacy.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{pharmacy.address}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                pharmacy.open ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {pharmacy.open ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>{pharmacy.distance}</span>
              <span className="flex items-center gap-1">★ {pharmacy.rating}</span>
              <span>{pharmacy.hours}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No pharmacies found</h3>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter.</p>
        </div>
      )}
    </motion.div>
  );
};

export default NearbyPharmacies;
