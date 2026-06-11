const POIDS = {
  adherence: 0.30,
  renouvellements: 0.20,
  visitesRegulieres: 0.15,
  interactions: 0.20,
  profilComplet: 0.15,
};

export function calculerScoreSante(patient) {
  const adherence = evaluerAdherence(patient.renouvellements || []);
  const renouvellements = evaluerRenouvellements(patient.renouvellements || []);
  const visitesRegulieres = evaluerRegulariteVisites(patient.visites || []);
  const interactions = evaluerInteractions(patient.interactions || []);
  const profilComplet = evaluerProfil(patient.profil || {});

  const scoreBrut =
    adherence * POIDS.adherence +
    renouvellements * POIDS.renouvellements +
    visitesRegulieres * POIDS.visitesRegulieres +
    interactions * POIDS.interactions +
    profilComplet * POIDS.profilComplet;

  const score = Math.round(scoreBrut * 100);
  return {
    score,
    niveau: getNiveau(score),
    composants: { adherence, renouvellements, visitesRegulieres, interactions, profilComplet },
    recommandations: genererRecommandations(score, { adherence, renouvellements, interactions }),
  };
}

function evaluerAdherence(renouvellements) {
  if (!renouvellements.length) return 0.5;
  const urgents = renouvellements.filter((r) => r.statut === 'URGENT').length;
  const ratio = 1 - urgents / renouvellements.length;
  return Math.max(0, Math.min(1, ratio));
}

function evaluerRenouvellements(renouvellements) {
  if (!renouvellements.length) return 0.5;
  const ok = renouvellements.filter((r) => r.statut === 'OK').length;
  return ok / renouvellements.length;
}

function evaluerRegulariteVisites(visites) {
  if (!visites.length) return 0.5;
  const dates = visites.map((v) => new Date(v.date)).sort((a, b) => b - a);
  const maintenant = new Date();
  const troisMois = 90 * 24 * 60 * 60 * 1000;
  const recentes = dates.filter((d) => maintenant - d < troisMois).length;
  return Math.min(1, recentes / 3);
}

function evaluerInteractions(interactions) {
  if (!interactions || !interactions.length) return 1;
  const graves = interactions.filter((i) => i.gravite === 'ÉLEVÉE').length;
  return Math.max(0, 1 - graves * 0.3);
}

function evaluerProfil(profil) {
  let score = 0;
  if (profil.groupeSanguin) score += 0.2;
  if (profil.allergenes?.length) score += 0.2;
  if (profil.maladiesChroniques?.length) score += 0.2;
  if (profil.mutuelle) score += 0.2;
  if (profil.urgentContact) score += 0.2;
  return score;
}

function getNiveau(score) {
  if (score >= 80) return 'EXCELLENT';
  if (score >= 60) return 'BON';
  if (score >= 40) return 'MOYEN';
  if (score >= 20) return 'FAIBLE';
  return 'CRITIQUE';
}

function genererRecommandations(score, composants) {
  const recos = [];
  if (composants.adherence < 0.5) recos.push('Planifier un rappel de renouvellement automatique');
  if (composants.interactions < 0.7) recos.push('Révision des interactions médicamenteuses avec le médecin traitant');
  if (composants.renouvellements < 0.5) recos.push('Programmer une consultation de suivi pour les traitements en cours');
  if (score < 40) recos.push('Bilan de santé complet recommandé dans les plus brefs délais');
  return recos;
}
