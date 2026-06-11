const SEUILS = {
  FREQUENCE_VISITES: { bas: 1, moyen: 3, eleve: 6 },
  RECENCE_JOURS: { risque: 90, critique: 180 },
  PANIER_MOYEN: { bas: 100, moyen: 300, eleve: 500 },
};

export function analyserFidelite(patient) {
  if (!patient?.visites) return { niveau: 'NON_CLASSIFIÉ', risqueDesabonnement: 0, recommandations: [] };

  const visites = patient.visites;
  const visitesParMois = visites.length / Math.max(1, getNbMois(visites));
  const derniereVisite = getDerniereVisite(visites);
  const joursDepuisDerniereVisite = Math.round((Date.now() - new Date(derniereVisite).getTime()) / (24 * 60 * 60 * 1000));
  const panierMoyen = calculerPanierMoyen(visites);

  const scoreFrequence = Math.min(1, visitesParMois / 2);
  const scoreRecence = Math.max(0, 1 - joursDepuisDerniereVisite / 180);
  const scorePanier = Math.min(1, panierMoyen / 500);
  const scoreTotal = Math.round((scoreFrequence * 0.4 + scoreRecence * 0.35 + scorePanier * 0.25) * 100);

  const niveau = getNiveauFidelite(scoreTotal);
  const risque = getRisque(joursDepuisDerniereVisite, scoreTotal);

  return {
    score: scoreTotal,
    niveau,
    risqueDesabonnement: risque,
    joursDepuisDerniereVisite,
    visitesParMois: visitesParMois.toFixed(1),
    panierMoyen: `${panierMoyen} DH`,
    recommandations: genererRecommandationsFidelite(niveau, risque, patient),
  };
}

export function segmenterPatients(patients) {
  const segments = { fideles: [], reguliers: [], risque: [], dormants: [] };
  patients.forEach((p) => {
    const analyse = analyserFidelite(p);
    if (analyse.risqueDesabonnement >= 70) segments.risque.push({ ...p, analyse });
    else if (analyse.risqueDesabonnement >= 40) segments.dormants.push({ ...p, analyse });
    else if (analyse.niveau === 'OR' || analyse.niveau === 'PLATINE') segments.fideles.push({ ...p, analyse });
    else segments.reguliers.push({ ...p, analyse });
  });

  return {
    segments,
    total: patients.length,
    tauxFidelisation: Math.round((segments.fideles.length / Math.max(1, patients.length)) * 100),
    tauxRisque: Math.round((segments.risque.length / Math.max(1, patients.length)) * 100),
  };
}

export function proposerRecompenses(patient) {
  const analyse = analyserFidelite(patient);
  const recompenses = [];

  if (analyse.risqueDesabonnement >= 70) {
    recompenses.push({ type: 'BONUS_RETOUR', message: 'Offrir une réduction de 20% sur la prochaine visite', cout: '200 DH' });
  }
  if (analyse.risqueDesabonnement >= 40 && analyse.risqueDesabonnement < 70) {
    recompenses.push({ type: 'RAPPEL', message: 'Envoyer un rappel personnalisé avec offre de fidélité', cout: '50 DH' });
  }
  if (analyse.niveau === 'ARGENT') {
    recompenses.push({ type: 'PALIER', message: 'Proposer un programme de parrainage pour atteindre le niveau Or', cout: '100 DH' });
  }
  if (analyse.niveau === 'OR') {
    recompenses.push({ type: 'VIP', message: 'Invitation au programme VIP avec avantages exclusifs', cout: '300 DH' });
  }

  return recompenses;
}

function getNbMois(visites) {
  if (!visites.length) return 1;
  const dates = visites.map((v) => new Date(v.date));
  const min = Math.min(...dates);
  const max = Math.max(...dates);
  return Math.max(1, (max - min) / (30 * 24 * 60 * 60 * 1000));
}

function getDerniereVisite(visites) {
  return visites.reduce((latest, v) => (v.date > latest ? v.date : latest), visites[0].date);
}

function calculerPanierMoyen(visites) {
  if (!visites.length) return 0;
  const total = visites.reduce((s, v) => s + (v.cout || 0), 0);
  return Math.round(total / visites.length);
}

function getNiveauFidelite(score) {
  if (score >= 80) return 'PLATINE';
  if (score >= 60) return 'OR';
  if (score >= 40) return 'ARGENT';
  return 'BRONZE';
}

function getRisque(joursDepuisDerniereVisite, score) {
  if (joursDepuisDerniereVisite >= 180 || score < 20) return 90;
  if (joursDepuisDerniereVisite >= 90 || score < 40) return 60;
  if (joursDepuisDerniereVisite >= 45 || score < 60) return 30;
  return 10;
}

function genererRecommandationsFidelite(niveau, risque, patient) {
  const recos = [];
  if (risque >= 70) recos.push('Campagne de reconquête : offre spéciale personnalisée');
  if (risque >= 40) recos.push('Newsletter hebdomadaire avec conseils santé');
  if (niveau === 'ARGENT') recos.push('Augmenter la fréquence des visites avec rappels SMS');
  if (niveau === 'OR' || niveau === 'PLATINE') recos.push('Programme de parrainage avec bonus');
  if (patient?.maladiesChroniques?.length) recos.push('Suivi personnalisé des maladies chroniques');
  return recos;
}
