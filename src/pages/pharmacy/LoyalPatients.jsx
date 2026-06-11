import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Medal, TrendingUp, Search, Star, DollarSign, ShoppingBag } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function Crown({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3 7 7-1-5 6 2 7-7-3-7 3 2-7-5-6 7 1z"/>
    </svg>
  );
}

const tierConfig = {
  Platine: { color: 'text-slate-800', bg: 'bg-gradient-to-r from-slate-100 to-slate-200 border-slate-300', icon: Crown, points: 5000 },
  Or: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Award, points: 2000 },
  Argent: { color: 'text-slate-500', bg: 'bg-slate-50 border-slate-200', icon: Medal, points: 1000 },
  Bronze: { color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', icon: Star, points: 0 },
};

const mockLoyalPatients = [
  { id: 1, nom: 'Amine Benali', email: 'amine@email.ma', telephone: '+212 6 12 34 56 78', visites: 18, totalDepense: 4580, dernierAchat: '2026-05-20', fidelite: 'Or', points: 3200 },
  { id: 2, nom: 'Salma El Ouafi', email: 'salma@email.ma', telephone: '+212 6 23 45 67 89', visites: 14, totalDepense: 3920, dernierAchat: '2026-05-18', fidelite: 'Or', points: 2800 },
  { id: 3, nom: 'Hassan Mokhtari', email: 'hassan@email.ma', telephone: '+212 6 34 56 78 90', visites: 11, totalDepense: 2850, dernierAchat: '2026-05-15', fidelite: 'Argent', points: 1800 },
  { id: 4, nom: 'Nadia Berrada', email: 'nadia@email.ma', telephone: '+212 6 45 67 89 01', visites: 9, totalDepense: 2100, dernierAchat: '2026-05-12', fidelite: 'Argent', points: 1500 },
  { id: 5, nom: 'Omar Tazi', email: 'omar@email.ma', telephone: '+212 6 56 78 90 12', visites: 7, totalDepense: 1670, dernierAchat: '2026-05-10', fidelite: 'Bronze', points: 800 },
  { id: 6, nom: 'Leila Benjelloun', email: 'leila@email.ma', telephone: '+212 6 67 89 01 23', visites: 6, totalDepense: 1430, dernierAchat: '2026-05-08', fidelite: 'Bronze', points: 650 },
  { id: 7, nom: 'Youssef El Fassi', email: 'youssef@email.ma', telephone: '+212 6 78 90 12 34', visites: 5, totalDepense: 1220, dernierAchat: '2026-05-05', fidelite: 'Bronze', points: 500 },
  { id: 8, nom: 'Khadija Amrani', email: 'khadija@email.ma', telephone: '+212 6 89 01 23 45', visites: 4, totalDepense: 980, dernierAchat: '2026-05-01', fidelite: 'Bronze', points: 350 },
];

const tabFilters = [
  { id: 'all', label: 'Tous', icon: Users },
  { id: 'Platine', label: 'Platine', icon: Crown },
  { id: 'Or', label: 'Or', icon: Award },
  { id: 'Argent', label: 'Argent', icon: Medal },
  { id: 'Bronze', label: 'Bronze', icon: Star },
];

const LoyalPatients = () => {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const filtered = mockLoyalPatients.filter(p => {
    const matchesSearch = p.nom.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'all' || p.fidelite === tierFilter;
    return matchesSearch && matchesTier;
  });

  const totalPatients = mockLoyalPatients.length;
  const totalRevenue = mockLoyalPatients.reduce((s, p) => s + p.totalDepense, 0);
  const totalVisits = mockLoyalPatients.reduce((s, p) => s + p.visites, 0);
  const avgSpend = totalPatients > 0 ? Math.round(totalRevenue / totalPatients) : 0;

  return (
    <div className="min-h-screen bg-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Patients fidèles</h1>
          <p className="text-sm text-contrast-muted mt-1">Programme de fidélité et suivi des patients</p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Patients fidèles', value: totalPatients, color: 'text-brand-600', bg: 'bg-brand-50' },
            { icon: DollarSign, label: 'Revenu total', value: `${totalRevenue.toLocaleString()} DH`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: ShoppingBag, label: 'Visites totales', value: totalVisits, color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: TrendingUp, label: 'Moy./patient', value: `${avgSpend.toLocaleString()} DH`, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((kpi) => (
            <motion.div key={kpi.label} variants={fadeUp} className="bg-card rounded-2xl border border-elevated p-5">
              <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <p className="text-2xl font-bold text-contrast-primary">{kpi.value}</p>
              <p className="text-xs text-contrast-muted mt-0.5">{kpi.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap items-center gap-2">
          {tabFilters.map((tab) => {
            const Icon = tab.icon;
            const isActive = tierFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTierFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-card border border-elevated text-contrast-secondary hover:border-muted hover:text-contrast-primary'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-card rounded-2xl border border-elevated p-6"
        >
          <div className="relative max-w-sm mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un patient..."
              className="w-full h-11 pl-11 pr-4 rounded-2xl border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-contrast-secondary border-b border-elevated">
                  <th className="text-left py-3 px-3 font-medium">Patient</th>
                  <th className="text-center py-3 px-3 font-medium">Visites</th>
                  <th className="text-center py-3 px-3 font-medium">Total dépensé</th>
                  <th className="text-center py-3 px-3 font-medium">Points</th>
                  <th className="text-center py-3 px-3 font-medium">Dernier achat</th>
                  <th className="text-center py-3 px-3 font-medium">Fidélité</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const tier = tierConfig[p.fidelite];
                  return (
                    <tr key={p.id} className="border-b border-elevated hover:bg-elevated/50 transition-colors">
                      <td className="py-4 px-3">
                        <div>
                          <p className="font-medium text-contrast-primary">{p.nom}</p>
                          <p className="text-[10px] text-contrast-muted">{p.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center text-contrast-secondary font-medium">{p.visites}</td>
                      <td className="py-4 px-3 text-center text-contrast-secondary font-medium">{p.totalDepense.toLocaleString()} DH</td>
                      <td className="py-4 px-3 text-center">
                        <span className="font-bold text-contrast-primary">{p.points}</span>
                      </td>
                      <td className="py-4 px-3 text-center text-contrast-secondary">{p.dernierAchat}</td>
                      <td className="py-4 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${tier.bg} ${tier.color}`}>
                          <tier.icon className="w-3 h-3" />
                          {p.fidelite}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-contrast-muted mx-auto mb-3" />
              <p className="text-sm text-contrast-secondary">Aucun patient trouvé</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoyalPatients;
