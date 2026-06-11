const FACTEURS_SAISONNIERS = {
  'Antibiotiques': { hiver: 1.4, printemps: 1.1, ete: 0.7, automne: 1.2 },
  'Antalgiques': { hiver: 1.2, printemps: 1.0, ete: 0.9, automne: 1.1 },
  'Respiratoire': { hiver: 1.8, printemps: 1.3, ete: 0.5, automne: 1.4 },
  'Cardiologie': { hiver: 1.1, printemps: 1.0, ete: 1.0, automne: 1.0 },
  'Diabète': { hiver: 1.0, printemps: 1.0, ete: 1.0, automne: 1.0 },
  'Gastro': { hiver: 0.9, printemps: 1.0, ete: 1.4, automne: 1.1 },
  'Anti-inflammatoires': { hiver: 1.0, printemps: 1.1, ete: 0.9, automne: 1.0 },
  'Antihistaminiques': { hiver: 0.6, printemps: 1.6, ete: 1.5, automne: 1.2 },
};

function getSaison() {
  const mois = new Date().getMonth();
  if (mois >= 2 && mois <= 4) return 'printemps';
  if (mois >= 5 && mois <= 7) return 'ete';
  if (mois >= 8 && mois <= 10) return 'automne';
  return 'hiver';
}

function getConsommationMoyenne(medicament, historique) {
  if (historique && historique.length > 0) {
    const total = historique.reduce((s, h) => s + h.consommation, 0);
    return total / historique.length;
  }
  return medicament.stock > 0 ? Math.max(1, Math.round(medicament.stock * 0.1)) : 10;
}

export function predireRuptureStock(medicament, historique) {
  const saison = getSaison();
  const facteurSaisonnier = FACTEURS_SAISONNIERS[medicament.categorie]?.[saison] || 1.0;
  const consommationMoyenne = getConsommationMoyenne(medicament, historique);
  const consommationPrevue = Math.round(consommationMoyenne * facteurSaisonnier * 30);

  const joursRestants = consommationPrevue > 0
    ? Math.round(medicament.stock / (consommationPrevue / 30))
    : 999;

  return {
    medicament: medicament.nom,
    stockActuel: medicament.stock,
    consommationMensuellePrevue: consommationPrevue,
    joursRestantsEstimes: joursRestants,
    facteurSaisonnier,
    saison,
    risqueRupture: joursRestants <= 7 ? 'CRITIQUE' : joursRestants <= 14 ? 'ÉLEVÉ' : joursRestants <= 30 ? 'MOYEN' : 'FAIBLE',
    dateEstimeeRupture: joursRestants < 999
      ? new Date(Date.now() + joursRestants * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      : null,
    recommandation: joursRestants <= 7
      ? 'Commander d\'urgence'
      : joursRestants <= 14
        ? 'Planifier un réapprovisionnement'
        : joursRestants <= 30
          ? 'Surveiller le stock'
          : 'Stock suffisant',
  };
}

export function predireDemandeGlobale(stock, historiqueVentes) {
  const saison = getSaison();
  return stock.map((med) => {
    const historique = historiqueVentes?.filter((v) => v.medicamentId === med.id) || [];
    return predireRuptureStock(med, historique);
  });
}

export function suggererReapprovisionnement(stock) {
  const predictions = stock.map((med) => ({
    ...predireRuptureStock(med),
    seuilAlerte: med.seuilAlerte,
  }));

  const urgents = predictions.filter((p) => p.risqueRupture === 'CRITIQUE');
  const planifies = predictions.filter((p) => p.risqueRupture === 'ÉLEVÉ');

  return {
    urgents: urgents.map((u) => ({
      nom: u.medicament,
      stock: u.stockActuel,
      recommandation: u.recommandation,
      quantiteRecommendee: Math.max(u.stockActuel * 2, 50),
    })),
    planifies: planifies.map((p) => ({
      nom: p.medicament,
      stock: p.stockActuel,
      recommandation: p.recommandation,
      quantiteRecommendee: Math.max(p.stockActuel, 30),
    })),
    totalUrgent: urgents.length,
    totalPlanifie: planifies.length,
  };
}
