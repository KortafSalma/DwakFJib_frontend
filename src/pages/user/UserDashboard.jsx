import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  Calendar, Repeat, Heart, Award,
  Clock, MapPin, Pill, AlertTriangle,
  Activity, TrendingUp,
  User, Phone, Droplets, Shield,
  Gift, Sparkles, ArrowRight,
  CheckCircle, Mail, ShoppingCart,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { patientProfile, patientVisites, patientRenouvellements, patientFidelite } from '../../mock/mockData';
import { calculerScoreSante } from '../../ai/healthScore';



const tabs = [
  { id: 'visites', label: 'Historique des visites', icon: Calendar },
  { id: 'renouvellements', label: 'Renouvellements', icon: Repeat },
  { id: 'sante', label: 'Profil santé', icon: Heart },
  { id: 'fidelite', label: 'Fidélité', icon: Award },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const statusStyles = {
  URGENT: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-400' },
  BIENTOT: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-400' },
  OK: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-400' },
};

const UserDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('visites');

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const validTabs = tabs.map(t => t.id);
    if (hash && validTabs.includes(hash) && hash !== activeTab) {
      setActiveTab(hash);
    }
  }, [location.hash, activeTab]);

  const scoreSante = calculerScoreSante({
    renouvellements: patientRenouvellements,
    visites: patientVisites,
    profil: patientProfile,
    interactions: [],
  });

  const analyseFidelite = {
    niveau: patientFidelite.niveau,
    visitesParMois: Math.round(patientVisites.length / 6),
    risqueDesabonnement: 15,
    recommandations: [
      'Visitez une pharmacie partenaire ce mois-ci pour bénéficier de points bonus',
      'Programmez un rappel de renouvellement pour vos traitements en cours',
    ],
  };

  return (
    <div className="min-h-screen bg-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">
            Bonjour, {user?.name?.split(' ')[0] || 'Amine'}
          </h1>
          <p className="text-sm text-contrast-secondary mt-1">Gérez votre santé et vos médicaments</p>
        </motion.div>

        {/* Health Score + Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-gradient-to-br from-brand-500 to-teal-600 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-white/70" />
              <span className="text-[10px] font-medium text-white/60 uppercase tracking-wider">Score</span>
            </div>
            <p className="text-3xl font-bold">{scoreSante.score}</p>
            <p className="text-xs text-white/80 mt-0.5">{scoreSante.niveau}</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-card rounded-2xl border border-elevated p-5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center mb-2">
              <Repeat className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-xl font-bold text-contrast-primary">{patientRenouvellements.filter((r) => r.statut === 'URGENT').length}</p>
            <p className="text-xs text-contrast-secondary mt-0.5">Renouvellements urgents</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-card rounded-2xl border border-elevated p-5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center mb-2">
              <Calendar className="w-4 h-4 text-brand-500" />
            </div>
            <p className="text-xl font-bold text-contrast-primary">{patientVisites.length}</p>
            <p className="text-xs text-contrast-secondary mt-0.5">Visites totales</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-card rounded-2xl border border-elevated p-5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center mb-2">
              <Award className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-xl font-bold text-contrast-primary">{patientFidelite.points.toLocaleString()}</p>
            <p className="text-xs text-contrast-secondary mt-0.5">Points fidélité</p>
          </motion.div>
        </div>

        {/* Tabs */}
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'visites' && <VisitesTab />}
            {activeTab === 'renouvellements' && <RenouvellementsTab />}
            {activeTab === 'sante' && <SanteTab scoreSante={scoreSante} />}
            {activeTab === 'fidelite' && <FideliteTab analyseFidelite={analyseFidelite} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const VisitesTab = () => (
  <div className="space-y-4">
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
      {patientVisites.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-2xl border border-elevated">
          <Calendar className="w-10 h-10 text-contrast-muted mx-auto mb-3" />
          <p className="text-sm text-contrast-secondary">Aucune visite enregistrée</p>
        </div>
      ) : (
        patientVisites.map((visite) => (
          <motion.div
            key={visite.id}
            variants={fadeUp}
            className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-brand-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-contrast-primary">{visite.motif}</p>
                  <p className="text-xs text-contrast-secondary mt-0.5">{visite.date} · {visite.medecin}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-contrast-primary">{visite.cout} DH</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-contrast-secondary mb-3">
              <MapPin className="w-3 h-3" /> {visite.pharmacie}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {visite.medicaments.map((med) => (
                <span key={med} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-elevated border border-elevated text-[10px] font-medium text-contrast-secondary">
                  <Pill className="w-3 h-3" /> {med}
                </span>
              ))}
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  </div>
);

const RenouvellementsTab = () => (
  <div className="space-y-4">
    {patientRenouvellements.filter((r) => r.statut === 'URGENT').length > 0 && (
      <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <p className="text-sm font-semibold text-red-700">Traitements à renouveler d'urgence</p>
        </div>
        <p className="text-xs text-red-600">
          {patientRenouvellements.filter((r) => r.statut === 'URGENT').length} médicament(s) nécessitent un renouvellement immédiat
        </p>
      </div>
    )}

    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
      {patientRenouvellements.map((ren) => {
        const s = statusStyles[ren.statut] || statusStyles.OK;
        return (
          <motion.div
            key={ren.id}
            variants={fadeUp}
            className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <Pill className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-contrast-primary">{ren.medicament}</p>
                  <p className="text-xs text-contrast-secondary mt-0.5">{ren.dosage}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${s.bg} ${s.color} ${s.border}`}>
                {ren.statut === 'URGENT' ? 'Urgent' : ren.statut === 'BIENTOT' ? 'Bientôt' : 'OK'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-elevated">
              <span className="text-xs text-contrast-secondary">
                <Clock className="w-3 h-3 inline mr-1" />
                Stock restant : {ren.stockJours} jours
              </span>
              <span className="text-xs text-contrast-secondary">{ren.pharmacie}</span>
            </div>
            {ren.statut === 'URGENT' && (
              <button className="mt-3 w-full py-2 rounded-xl bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-all inline-flex items-center justify-center gap-1">
                <ShoppingCart className="w-3 h-3" /> Commander maintenant
              </button>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  </div>
);

const SanteTab = ({ scoreSante }) => (
  <div className="space-y-4">
    {/* Profile Card */}
    <div className="bg-card rounded-2xl border border-elevated p-6">
      <h2 className="text-base font-semibold text-contrast-primary mb-4 flex items-center gap-2">
        <User className="w-4 h-4 text-brand-500" /> Informations personnelles
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: User, label: 'Nom', value: patientProfile.nom },
          { icon: Mail, label: 'Email', value: patientProfile.email },
          { icon: Phone, label: 'Téléphone', value: patientProfile.telephone },
          { icon: Calendar, label: 'Date de naissance', value: patientProfile.dateNaissance },
          { icon: Droplets, label: 'Groupe sanguin', value: patientProfile.groupeSanguin },
          { icon: Shield, label: 'Mutuelle', value: `${patientProfile.mutuelle} · ${patientProfile.numeroMutuelle}` },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-elevated">
            <item.icon className="w-4 h-4 text-contrast-muted flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-contrast-secondary uppercase tracking-wider">{item.label}</p>
              <p className="text-xs font-medium text-contrast-primary truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Allergenes & Maladies */}
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="bg-card rounded-2xl border border-elevated p-6">
        <h3 className="text-sm font-semibold text-contrast-primary mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" /> Allergènes
        </h3>
        <div className="flex flex-wrap gap-2">
          {patientProfile.allergenes.map((a) => (
            <span key={a} className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-600">
              {a}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-2xl border border-elevated p-6">
        <h3 className="text-sm font-semibold text-contrast-primary mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-amber-500" /> Maladies chroniques
        </h3>
        <div className="space-y-2">
          {patientProfile.maladiesChroniques.map((m) => (
            <div key={m} className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-medium text-amber-700">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Health Recommendations */}
    {scoreSante.recommandations.length > 0 && (
      <div className="bg-card rounded-2xl border border-elevated p-6">
        <h3 className="text-sm font-semibold text-contrast-primary mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" /> Recommandations
        </h3>
        <div className="space-y-2">
          {scoreSante.recommandations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-brand-50 border border-brand-100">
              <ArrowRight className="w-3.5 h-3.5 text-brand-500 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-brand-800">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const FideliteTab = ({ analyseFidelite }) => (
  <div className="space-y-4">
    {/* Niveau Card */}
    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Niveau</p>
          <p className="text-2xl font-bold">{patientFidelite.niveau}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-card/15 flex items-center justify-center">
          <Award className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/80">
          <span>Prochain niveau : {patientFidelite.prochainNiveau}</span>
          <span>{patientFidelite.pointsRestants} points restants</span>
        </div>
        <div className="h-2 rounded-full bg-card/20 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((patientFidelite.points / (patientFidelite.points + patientFidelite.pointsRestants)) * 100, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-card"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {patientFidelite.avantages.map((av) => (
          <span key={av} className="px-2.5 py-1 rounded-full bg-card/15 text-[10px] font-medium text-white border border-white/20">
            {av}
          </span>
        ))}
      </div>
    </div>

    {/* Points History */}
    <div className="bg-card rounded-2xl border border-elevated p-6">
      <h3 className="text-sm font-semibold text-contrast-primary mb-4">Historique des points</h3>
      <div className="space-y-3">
        {patientFidelite.historiquePoints.map((h, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-elevated last:border-0">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${h.type === 'gagnés' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                {h.type === 'gagnés' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-contrast-primary">{h.source}</p>
                <p className="text-[10px] text-contrast-secondary">{h.date}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold ${h.type === 'gagnés' ? 'text-emerald-600' : 'text-red-500'}`}>
              {h.type === 'gagnés' ? '+' : '-'}{h.points}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Available Rewards */}
    <div className="bg-card rounded-2xl border border-elevated p-6">
      <h3 className="text-sm font-semibold text-contrast-primary mb-4 flex items-center gap-2">
        <Gift className="w-4 h-4 text-brand-500" /> Récompenses disponibles
      </h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {patientFidelite.recompensesDisponibles.map((r) => (
          <div key={r.id} className="p-4 rounded-xl bg-elevated border border-elevated hover:border-brand-200 hover:shadow-sm transition-all">
            <p className="text-lg font-bold text-brand-500">{r.points.toLocaleString()}</p>
            <p className="text-xs font-semibold text-contrast-primary mt-1">{r.nom}</p>
            <p className="text-[10px] text-contrast-secondary mt-1">{r.description}</p>
            <button className="mt-3 w-full py-1.5 rounded-lg bg-brand-500 text-white text-[10px] font-medium hover:bg-brand-600 transition-all">
              Échanger
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Loyalty Analysis */}
    <div className="bg-card rounded-2xl border border-elevated p-6">
      <h3 className="text-sm font-semibold text-contrast-primary mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-500" /> Analyse IA
      </h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-4 rounded-xl bg-elevated">
          <p className="text-lg font-bold text-contrast-primary">{analyseFidelite.niveau}</p>
          <p className="text-[10px] text-contrast-secondary mt-1">Niveau fidélité</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-elevated">
          <p className="text-lg font-bold text-contrast-primary">{analyseFidelite.visitesParMois}</p>
          <p className="text-[10px] text-contrast-secondary mt-1">Visites / mois</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-elevated">
          <p className="text-lg font-bold text-contrast-primary">{analyseFidelite.risqueDesabonnement}%</p>
          <p className="text-[10px] text-contrast-secondary mt-1">Risque de désengagement</p>
        </div>
      </div>
      {analyseFidelite.recommandations.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-contrast-secondary mb-2">Recommandations personnalisées :</p>
          {analyseFidelite.recommandations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-brand-50 border border-brand-100">
              <Sparkles className="w-3.5 h-3.5 text-brand-500 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-brand-800">{rec}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default UserDashboard;
