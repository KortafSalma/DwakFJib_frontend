import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign, Package, Truck, Clock,
  ShoppingCart, ChevronRight, BarChart3,
  Store, Award, User,
} from 'lucide-react';
import { StatCard, Card, DashboardSection } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { distributeurData } from '../../mock/mockData';

const statutLivraisonStyles = {
  EN_TRANSIT: { label: 'En transit', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-400' },
  PREPARATION: { label: 'Préparation', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-400' },
  EN_ATTENTE: { label: 'En attente', color: 'text-contrast-secondary', bg: 'bg-elevated', border: 'border-elevated', dot: 'bg-contrast-muted' },
  LIVRE: { label: 'Livré', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-400' },
};

const DistributorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState('revenu');

  const enAttente = distributeurData.livraisonsEnAttente.filter((l) => l.statut !== 'LIVRE');
  const livreursDispos = distributeurData.livreurs.filter((l) => l.statut === 'disponible');

  const livraisonsEnCours = enAttente.filter((l) => l.statut === 'EN_TRANSIT').length;
  const enPreparation = enAttente.filter((l) => l.statut === 'PREPARATION').length;

  return (
    <div className="min-h-screen bg-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">
              Bonjour, {user?.name || 'Distributeur'}
            </h1>
            <p className="text-sm text-contrast-secondary mt-1">{distributeurData.entreprise}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-[11px] font-semibold text-brand-600">En ligne</span>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard icon={DollarSign} label="Revenu total" value={distributeurData.kpis.revenuTotal} color="emerald" />
          <StatCard icon={ShoppingCart} label="Commandes du mois" value={distributeurData.kpis.commandesMois} color="primary" />
          <StatCard icon={Store} label="Pharmacies actives" value={distributeurData.kpis.pharmaciesActives} color="blue" />
          <StatCard icon={Package} label="Produits disponibles" value={distributeurData.kpis.produitsDisponibles} color="violet" />
          <StatCard icon={Award} label="Taux de livraison" value={distributeurData.kpis.tauxLivraison} color="yellow" />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Package, label: 'Gérer le stock', path: '/distributor/shipments' },
            { icon: Truck, label: 'Livraisons', path: '/distributor/tracking' },
            { icon: ShoppingCart, label: 'Commandes', path: '/distributor/orders' },
            { icon: BarChart3, label: 'Rapports', path: '/distributor/analytics' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-elevated hover:border-elevated hover:shadow-sm transition-all"
            >
              <action.icon className="w-5 h-5 text-brand-500" />
              <span className="text-sm font-medium text-contrast-primary">{action.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-contrast-muted ml-auto" />
            </button>
          ))}
        </div>

        {/* Livreurs disponibles alert */}
        {livreursDispos.length > 0 && (
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
                <User className="w-4 h-4 text-brand-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-800">{livreursDispos.length} livreur(s) disponible(s)</p>
                <p className="text-xs text-brand-600">Nouvelle livraison à assigner</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/distributor/shipments')}
              className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-all"
            >
              Assigner
            </button>
          </div>
        )}

        {/* Pending Deliveries + Top Partners */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Pending Deliveries */}
          <Card>
            <DashboardSection
              title="Livraisons en cours"
              description={`${enAttente.length} livraison(s) active(s)`}
              action={
                <button
                  onClick={() => navigate('/distributor/tracking')}
                  className="text-xs font-medium text-brand-500 hover:text-brand-600 inline-flex items-center gap-0.5"
                >
                  Voir tout <ChevronRight className="w-3 h-3" />
                </button>
              }
            />
            <div className="space-y-3">
              {enAttente.slice(0, 4).map((liv) => {
                const s = statutLivraisonStyles[liv.statut] || statutLivraisonStyles.EN_ATTENTE;
                return (
                  <div key={liv.id} className="flex items-center gap-4 p-4 rounded-xl bg-elevated border border-elevated">
                    <div className={`w-2 h-2 rounded-full ${s.dot} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-contrast-primary">{liv.id}</span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.color} border ${s.border}`}>
                          {s.label}
                        </span>
                      </div>
                      <p className="text-xs text-contrast-secondary mt-0.5">{liv.pharmacie} · {liv.articles} articles</p>
                      <p className="text-[10px] text-contrast-muted mt-0.5">
                        {liv.livreur !== 'Non assigné' ? `Livreur : ${liv.livreur}` : 'Non assigné'} · Estimé : {liv.estimation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Top Partners */}
          <Card>
            <DashboardSection title="Top partenaires" description="Par chiffre d'affaires" />
            <div className="space-y-4">
              {distributeurData.topPartenaires.map((p, i) => {
                const maxRevenu = Math.max(...distributeurData.topPartenaires.map((pp) => parseInt(pp.revenu.replace(/\D/g, ''))));
                const revenuNum = parseInt(p.revenu.replace(/\D/g, ''));
                return (
                  <div key={p.nom}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-contrast-muted w-4">{i + 1}</span>
                        <span className="text-sm font-medium text-contrast-primary">{p.nom}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-contrast-primary">{p.revenu}</span>
                        <span className="text-[10px] text-contrast-muted ml-2">{p.commandes} commandes</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-elevated overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(revenuNum / maxRevenu) * 100}%` }}
                        transition={{ delay: i * 0.06, duration: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue / Orders Trend */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-contrast-primary">Tendance {period === 'revenu' ? 'revenus' : 'commandes'}</h2>
                <p className="text-xs text-contrast-secondary mt-0.5">Performance mensuelle</p>
              </div>
              <div className="flex gap-1 p-1 rounded-xl bg-elevated border border-elevated">
                {['revenu', 'commandes'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      period === p
                        ? 'bg-card text-contrast-primary shadow-sm border border-elevated'
                        : 'text-contrast-secondary hover:text-contrast-primary'
                    }`}
                  >
                    {p === 'revenu' ? 'Revenu' : 'Commandes'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-3 h-48">
              {(period === 'revenu' ? distributeurData.tendanceRevenu : distributeurData.tendanceCommandes).map((d, i) => {
                const dataSet = period === 'revenu' ? distributeurData.tendanceRevenu : distributeurData.tendanceCommandes;
                const maxVal = Math.max(...dataSet.map((x) => x.valeur));
                return (
                  <div key={d.mois} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <span className="text-[10px] text-contrast-muted opacity-0 group-hover:opacity-100">
                      {period === 'revenu' ? `${d.valeur.toLocaleString()} DH` : d.valeur}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.valeur / maxVal) * 100}%` }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="w-full rounded-lg transition-all cursor-pointer"
                      style={{
                        background: `linear-gradient(to top, ${period === 'revenu' ? '#14B8A6' : '#3B82F6'}CC, ${period === 'revenu' ? '#14B8A6' : '#3B82F6'}80)`,
                      }}
                    />
                    <span className="text-[10px] text-contrast-muted font-medium">{d.mois}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Product Demand */}
          <Card>
            <DashboardSection title="Demande produits" description="Les plus commandés" />
            <div className="space-y-3">
              {distributeurData.produitsDemande.map((item, i) => {
                const maxCmd = Math.max(...distributeurData.produitsDemande.map((p) => p.commandes));
                return (
                  <div key={item.nom} className="flex items-center gap-3 p-3 rounded-xl bg-elevated border border-elevated">
                    <span className="text-[11px] font-medium text-contrast-muted w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-contrast-primary truncate">{item.nom}</span>
                        <span className={`text-[10px] font-medium flex items-center gap-0.5 ${item.tendance === 'hausse' ? 'text-emerald-600' : 'text-red-500'}`}>
                          {item.tendance === 'hausse' ? '↑' : '↓'} {item.commandes}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-elevated overflow-hidden mt-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.commandes / maxCmd) * 100}%` }}
                          transition={{ delay: i * 0.06, duration: 0.4 }}
                          className={`h-full rounded-full ${item.tendance === 'hausse' ? 'bg-brand-400' : 'bg-contrast-muted'}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Delivery Performance */}
        <Card>
          <DashboardSection title="Performance livraison" description="Métriques d'efficacité" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { icon: Award, label: 'Taux succès', value: distributeurData.kpis.tauxLivraison, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Truck, label: 'En transit', value: livraisonsEnCours, color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Clock, label: 'Préparation', value: enPreparation, color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: User, label: 'Livreurs actifs', value: distributeurData.livreurs.filter((l) => l.statut === 'actif').length, color: 'text-brand-600', bg: 'bg-brand-50' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-elevated border border-elevated">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2 ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-xl font-bold text-contrast-primary">{stat.value}</p>
                <p className="text-[10px] text-contrast-secondary mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 border border-brand-200">
            <Truck className="w-5 h-5 text-brand-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-medium text-contrast-primary">
                {distributeurData.livreurs.filter((l) => l.statut === 'actif').length} livreurs actifs aujourd'hui
              </p>
              <p className="text-[10px] text-contrast-secondary mt-0.5">
                {livraisonsEnCours} livraisons en transit
              </p>
            </div>
            <button
              onClick={() => navigate('/distributor/tracking')}
              className="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-all"
            >
              Suivre
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DistributorDashboard;
