import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  LayoutDashboard, Users, Package, BarChart3, Brain,
  AlertTriangle, AlertCircle, Award, Pill, Plus,
  DollarSign, Store, Camera, Barcode as BarcodeIcon,
  Activity, TrendingUp, Zap, Sparkles,
} from 'lucide-react';
import { StatCard, Card, DashboardSection, EmptyState } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { pharmacienData } from '../../mock/mockData';
import { predireRuptureStock, suggererReapprovisionnement } from '../../ai/stockPrediction';
import { segmenterPatients } from '../../ai/retentionEngine';
import AddMedicationModal from '../../components/pharmacy/AddMedicationModal';

const tabs = [
  { id: 'apercu', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients fidèles', icon: Users },
  { id: 'stock', label: 'Stock', icon: Package },
  { id: 'statistiques', label: 'Statistiques', icon: BarChart3 },
  { id: 'ia', label: 'IA & Alertes', icon: Brain },
];

const statutStockStyles = {
  OK: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ALERTE: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  RUPTURE: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
};

const PharmacyDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('apercu');
  const [showAddMedication, setShowAddMedication] = useState(false);

  const isNewPharmacy = pharmacienData.stock.length === 0;

  const predictionsStock = suggererReapprovisionnement(pharmacienData.stock);
  const analysePatients = segmenterPatients(
    pharmacienData.patientsFideles.map((p) => ({
      ...p,
      visites: patientVisitesEquivalent(p.visites),
    }))
  );

  if (isNewPharmacy) {
    return (
      <div className="min-h-screen bg-body">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <EmptyState
            icon={Store}
            title={`Bienvenue, ${user?.name || 'Pharmacien'}!`}
            description="Votre pharmacie est prête! Commencez par ajouter vos premiers médicaments avec leurs photos et prix en MAD (Dirhams Marocains)."
            action={
              <div className="flex flex-col items-center gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                  {[
                    { icon: Camera, title: '1. Photos du médicament', desc: 'Prenez en photo chaque face du produit' },
                    { icon: DollarSign, title: '2. Prix en MAD', desc: 'Définissez vos prix en Dirhams Marocains' },
                    { icon: BarcodeIcon, title: '3. Code-barres', desc: 'Scannez ou générez un code-barres unique' },
                  ].map((step) => (
                    <div key={step.title} className="p-4 rounded-2xl bg-card border border-elevated text-center">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                        <step.icon className="w-6 h-6 text-brand-500" />
                      </div>
                      <h3 className="text-sm font-semibold text-contrast-primary mb-1">{step.title}</h3>
                      <p className="text-xs text-contrast-muted">{step.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setShowAddMedication(true)}
                    className="px-6 py-3 rounded-xl bg-brand-500 text-sm font-semibold text-white hover:bg-brand-600 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter mon premier médicament
                  </button>
                  <button className="px-6 py-3 rounded-xl border border-elevated text-sm font-medium text-contrast-secondary hover:bg-elevated transition-all">
                    Configurer ma pharmacie
                  </button>
                </div>
                <div className="p-6 rounded-2xl bg-brand-50 border border-brand-200 text-left max-w-lg">
                  <p className="text-xs font-semibold text-brand-700 mb-2">Astuce pour commencer</p>
                  <p className="text-xs text-brand-600 leading-relaxed">
                    Pour les produits cosmétiques (Derma), vous pouvez ajouter une remise automatique.
                    Utilisez le code-barres pour faciliter la gestion des ventes en caisse.
                    Tous les prix sont en MAD (Dirhams Marocains).
                  </p>
                </div>
              </div>
            }
          />
        </div>

        <AddMedicationModal
          isOpen={showAddMedication}
          onClose={() => setShowAddMedication(false)}
          onSuccess={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">
              Bonjour, {user?.name || 'Pharmacien'}
            </h1>
            <p className="text-sm text-contrast-secondary mt-1">{pharmacienData.pharmacie}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-[11px] font-semibold text-brand-600">En ligne</span>
          </div>
        </motion.div>

        <div className="flex items-center justify-between">
          <div>
            {predictionsStock.urgents.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <p className="text-sm font-semibold text-red-700">Alertes stock critiques</p>
                </div>
                <p className="text-xs text-red-600">
                  {predictionsStock.urgents.length} médicament(s) en risque de rupture immédiate selon l'IA
                </p>
              </motion.div>
            )}
          </div>
          <button
            onClick={() => setShowAddMedication(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 transition-all"
          >
            <Plus className="w-4 h-4" />
            Ajouter un médicament
          </button>
        </div>

        <div className="border-b border-elevated">
          <div className="flex gap-1 overflow-x-auto -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    isActive
                      ? 'text-brand-600 border-brand-500'
                      : 'text-contrast-secondary border-transparent hover:text-contrast-primary hover:border-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'apercu' && <ApercuTab />}
            {activeTab === 'patients' && <PatientsTab analysePatients={analysePatients} />}
            {activeTab === 'stock' && <StockTab predictionsStock={predictionsStock} />}
            {activeTab === 'statistiques' && <StatistiquesTab />}
            {activeTab === 'ia' && <IATab analysePatients={analysePatients} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AddMedicationModal
        isOpen={showAddMedication}
        onClose={() => setShowAddMedication(false)}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
};

const ApercuTab = () => {
  const stockOK = pharmacienData.stock.filter((m) => m.statut === 'OK').length;
  const stockAlerte = pharmacienData.stock.filter((m) => m.statut === 'ALERTE').length;
  const stockRupture = pharmacienData.stock.filter((m) => m.statut === 'RUPTURE').length;
  const totalPatients = pharmacienData.patientsFideles.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Médicaments en stock" value={stockOK} color="emerald" />
        <StatCard icon={AlertTriangle} label="Stock bas" value={stockAlerte} color="yellow" />
        <StatCard icon={AlertCircle} label="En rupture" value={stockRupture} color="red" />
        <StatCard icon={Award} label="Patients fidèles" value={totalPatients} color="primary" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <DashboardSection title="Ventes hebdomadaires" />
          <div className="flex items-end gap-3 h-40">
            {pharmacienData.ventesHebdo.map((d, i) => {
              const maxVal = Math.max(...pharmacienData.ventesHebdo.map((v) => v.ventes));
              return (
                <div key={d.jour} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] text-contrast-muted opacity-0 group-hover:opacity-100">{d.ventes} DH</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.ventes / maxVal) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="w-full rounded-lg bg-gradient-to-t from-brand-500/80 to-brand-400/60 cursor-pointer"
                  />
                  <span className="text-[10px] text-contrast-muted">{d.jour}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <DashboardSection title="Activité récente" />
          <div className="space-y-3">
            {pharmacienData.activiteRecente.slice(0, 4).map((log) => (
              <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-elevated last:border-0">
                <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-3.5 h-3.5 text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-contrast-primary">{log.action}</p>
                  <p className="text-[10px] text-contrast-secondary mt-0.5">{log.detail}</p>
                  <p className="text-[10px] text-contrast-muted mt-0.5">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const PatientsTab = ({ analysePatients }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-4">
      <StatCard icon={Users} label="Fidèles" value={analysePatients.segments.fideles.length} color="emerald" />
      <StatCard icon={Users} label="Réguliers" value={analysePatients.segments.reguliers.length} color="primary" />
      <StatCard icon={AlertCircle} label="À risque" value={analysePatients.segments.risque.length + analysePatients.segments.dormants.length} color="red" />
    </div>

    <Card>
      <DashboardSection title="Liste des patients fidèles" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-contrast-secondary border-b border-elevated">
              <th className="text-left py-3 px-2 font-medium">Patient</th>
              <th className="text-center py-3 px-2 font-medium">Visites</th>
              <th className="text-center py-3 px-2 font-medium">Total dépensé</th>
              <th className="text-center py-3 px-2 font-medium">Dernier achat</th>
              <th className="text-center py-3 px-2 font-medium">Fidélité</th>
            </tr>
          </thead>
          <tbody>
            {pharmacienData.patientsFideles.map((p) => (
              <tr key={p.id} className="border-b border-elevated hover:bg-elevated transition-colors">
                <td className="py-3 px-2">
                  <span className="font-medium text-contrast-primary">{p.nom}</span>
                </td>
                <td className="py-3 px-2 text-center text-contrast-secondary">{p.visites}</td>
                <td className="py-3 px-2 text-center text-contrast-secondary">{p.totalDepense}</td>
                <td className="py-3 px-2 text-center text-contrast-secondary">{p.dernierAchat}</td>
                <td className="py-3 px-2 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    p.fidelite === 'Or' ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : p.fidelite === 'Argent' ? 'bg-elevated text-contrast-secondary border border-elevated'
                    : 'bg-orange-50 text-orange-600 border border-orange-200'
                  }`}>
                    {p.fidelite}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const StockTab = ({ predictionsStock }) => (
  <div className="space-y-4">
    {predictionsStock.urgents.length > 0 && (
      <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <p className="text-sm font-semibold text-red-700">Réapprovisionnement urgent recommandé par l'IA</p>
        </div>
        <div className="space-y-2 mt-3">
          {predictionsStock.urgents.map((u) => (
            <div key={u.nom} className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-red-100">
              <div>
                <p className="text-xs font-medium text-contrast-primary">{u.nom}</p>
                <p className="text-[10px] text-contrast-secondary">Stock actuel : {u.stock} · Recommandé : {u.quantiteRecommendee}</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-[10px] font-medium hover:bg-brand-600 transition-all">
                Commander
              </button>
            </div>
          ))}
        </div>
      </div>
    )}

    <Card>
      <DashboardSection title="Inventaire complet" />
      <div className="space-y-2">
        {pharmacienData.stock.map((med) => {
          const s = statutStockStyles[med.statut] || statutStockStyles.OK;
          return (
            <div key={med.id} className="flex items-center gap-4 p-4 rounded-xl bg-elevated border border-elevated hover:border-elevated transition-all">
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <Pill className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-contrast-primary">{med.nom}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${s.bg} ${s.color} ${s.border}`}>
                    {med.statut === 'OK' ? 'OK' : med.statut === 'ALERTE' ? 'Alarme' : 'Rupture'}
                  </span>
                </div>
                <p className="text-xs text-contrast-secondary mt-0.5">{med.categorie} · {med.prix} DH · Seuil : {med.seuilAlerte}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${med.statut === 'RUPTURE' ? 'text-red-500' : med.statut === 'ALERTE' ? 'text-amber-500' : 'text-contrast-primary'}`}>
                  {med.stock}
                </p>
                <p className="text-[10px] text-contrast-muted">unités</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>

    {predictionsStock.planifies.length > 0 && (
      <Card>
        <DashboardSection
          title="Planification IA"
          description="Réapprovisionnements recommandés dans les 30 jours"
        />
        <div className="space-y-2">
          {predictionsStock.planifies.map((p) => (
            <div key={p.nom} className="flex items-center justify-between p-3 rounded-xl bg-elevated border border-elevated">
              <div>
                <p className="text-xs font-medium text-contrast-primary">{p.nom}</p>
                <p className="text-[10px] text-contrast-secondary">Stock : {p.stock} · Recommandé : {p.quantiteRecommendee}</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                Planifier
              </span>
            </div>
          ))}
        </div>
      </Card>
    )}
  </div>
);

const StatistiquesTab = () => {
  const totalVentes = pharmacienData.ventesHebdo.reduce((s, v) => s + v.ventes, 0);
  const ventesMax = Math.max(...pharmacienData.ventesHebdo.map((v) => v.ventes));
  const meilleurJour = pharmacienData.ventesHebdo.find((v) => v.ventes === ventesMax);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Ventes totales (semaine)" value={`${totalVentes.toLocaleString()} DH`} color="primary" />
        <StatCard icon={TrendingUp} label="Meilleur jour" value={meilleurJour?.jour || '—'} color="blue" />
        <StatCard icon={BarChart3} label="Moyenne journalière" value={`${Math.round(totalVentes / 7).toLocaleString()} DH`} color="emerald" />
        <StatCard icon={Award} label="Objectif atteint" value={`${pharmacienData.ventesHebdo.filter((v) => v.ventes >= v.objectif).length}/7`} color="violet" />
      </div>

      <Card>
        <DashboardSection title="Ventes vs Objectifs" />
        <div className="space-y-3">
          {pharmacienData.ventesHebdo.map((d) => {
            const pct = (d.ventes / d.objectif) * 100;
            return (
              <div key={d.jour}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-contrast-primary">{d.jour}</span>
                  <span className="text-contrast-secondary">{d.ventes} DH / {d.objectif} DH</span>
                </div>
                <div className="h-2.5 rounded-full bg-elevated overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full ${pct >= 100 ? 'bg-emerald-400' : pct >= 70 ? 'bg-brand-400' : 'bg-amber-400'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const IATab = ({ analysePatients }) => {
  const stockPredictions = pharmacienData.stock.map((med) => predireRuptureStock(med));
  const alertesCritiques = pharmacienData.iaAlertes.filter((a) => a.priorite === 'CRITIQUE' || a.priorite === 'HAUTE');

  return (
    <div className="space-y-4">
      {alertesCritiques.length > 0 && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-sm font-semibold text-red-700">Alertes IA critiques</p>
          </div>
          {pharmacienData.iaAlertes.filter((a) => a.priorite !== 'BASSE').map((a) => (
            <div key={a.id} className="flex items-start gap-3 mt-3 p-3 rounded-xl bg-card border border-red-100">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                a.type === 'INTERACTION' ? 'bg-red-50' : a.type === 'PREDICTION' ? 'bg-amber-50' : 'bg-brand-50'
              }`}>
                {a.type === 'INTERACTION' ? <AlertCircle className="w-4 h-4 text-red-500" /> :
                 a.type === 'PREDICTION' ? <Zap className="w-4 h-4 text-amber-500" /> :
                 <Sparkles className="w-4 h-4 text-brand-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-contrast-primary">{a.message}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    a.priorite === 'CRITIQUE' ? 'bg-red-50 text-red-600 border border-red-200'
                    : a.priorite === 'HAUTE' ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-brand-50 text-brand-600 border border-brand-200'
                  }`}>
                    {a.priorite}
                  </span>
                </div>
                <p className="text-[10px] text-contrast-secondary mt-1">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <DashboardSection
            title={<span className="flex items-center gap-2"><Brain className="w-4 h-4 text-brand-500" /> Prédictions de rupture</span>}
          />
          <div className="space-y-3">
            {stockPredictions.filter((p) => p.risqueRupture !== 'FAIBLE').slice(0, 5).map((p) => (
              <div key={p.medicament} className="flex items-center justify-between p-3 rounded-xl bg-elevated border border-elevated">
                <div>
                  <p className="text-xs font-medium text-contrast-primary">{p.medicament}</p>
                  <p className="text-[10px] text-contrast-secondary">Stock : {p.stockActuel} · {p.joursRestantsEstimes} jours restants</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                  p.risqueRupture === 'CRITIQUE' ? 'bg-red-50 text-red-600 border border-red-200'
                  : p.risqueRupture === 'ÉLEVÉ' ? 'bg-amber-50 text-amber-600 border border-amber-200'
                  : 'bg-brand-50 text-brand-600 border border-brand-200'
                }`}>
                  {p.risqueRupture}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <DashboardSection
            title={<span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-500" /> Analyse rétention patients</span>}
          />
          <div className="space-y-3">
            {analysePatients && analysePatients.segments.risque.slice(0, 3).map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-elevated border border-elevated">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-contrast-primary">{p.nom}</p>
                  <p className="text-[10px] text-contrast-secondary">Risque : {p.analyse?.risqueDesabonnement || 60}%</p>
                </div>
                <button className="text-[10px] px-2.5 py-1 rounded-lg bg-brand-500 text-white font-medium">
                  Relancer
                </button>
              </div>
            ))}
            {(!analysePatients || analysePatients.segments.risque.length === 0) && (
              <p className="text-xs text-contrast-secondary text-center py-4">Aucun patient à risque</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

function patientVisitesEquivalent(nbVisites) {
  const dates = [];
  for (let i = 0; i < nbVisites; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i * 25);
    dates.push({ date: d.toISOString().split('T')[0], cout: Math.round(150 + Math.random() * 200) });
  }
  return dates;
}

export default PharmacyDashboard;
