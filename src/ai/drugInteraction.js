const baseDeDonnees = [
  { medicament1: 'Lisinopril', medicament2: 'Ibuprofène', gravite: 'ÉLEVÉE', effet: 'Réduction de l\'effet antihypertenseur, risque d\'insuffisance rénale', recommandation: 'Surveiller la tension artérielle et la fonction rénale' },
  { medicament1: 'Warfarine', medicament2: 'Amoxicilline', gravite: 'MODÉRÉE', effet: 'Augmentation du risque hémorragique', recommandation: 'Surveiller INR, ajuster dose si nécessaire' },
  { medicament1: 'Metformine', medicament2: 'Ibuprofène', gravite: 'MODÉRÉE', effet: 'Risque d\'acidose lactique accru', recommandation: 'Surveiller la fonction rénale' },
  { medicament1: 'Atorvastatine', medicament2: 'Kétoconazole', gravite: 'ÉLEVÉE', effet: 'Augmentation du risque de myopathie', recommandation: 'Éviter l\'association' },
  { medicament1: 'Ventoline', medicament2: 'Propranolol', gravite: 'MOYENNE', effet: 'Diminution de l\'efficacité bronchodilatatrice', recommandation: 'Utiliser avec prudence' },
  { medicament1: 'Oméprazole', medicament2: 'Clopidogrel', gravite: 'MODÉRÉE', effet: 'Réduction de l\'activation du clopidogrel', recommandation: 'Utiliser pantoprazole à la place' },
  { medicament1: 'Amoxicilline', medicament2: 'Méthotrexate', gravite: 'ÉLEVÉE', effet: 'Augmentation de la toxicité du méthotrexate', recommandation: 'Éviter l\'association' },
  { medicament1: 'Fluoxétine', medicament2: 'Ibuprofène', gravite: 'MODÉRÉE', effet: 'Augmentation du risque de saignement', recommandation: 'Surveiller les signes de saignement' },
  { medicament1: 'Digoxine', medicament2: 'Amiodarone', gravite: 'ÉLEVÉE', effet: 'Augmentation de la digoxinémie', recommandation: 'Réduire dose digoxine de 50%' },
  { medicament1: 'Amlodipine', medicament2: 'Simvastatine', gravite: 'MODÉRÉE', effet: 'Augmentation du risque de myopathie', recommandation: 'Limiter simvastatine à 20mg/jour' },
];

export function detecterInteractions(medicaments, profilPatient) {
  if (!medicaments || medicaments.length < 2) return [];

  const interactions = [];
  const nomsNettoyes = medicaments.map((m) => {
    if (typeof m === 'string') return m.split(' ')[0];
    return (m.nom || m).split(' ')[0];
  });

  for (const regle of baseDeDonnees) {
    const idx1 = nomsNettoyes.findIndex(
      (n) => n.toLowerCase().includes(regle.medicament1.toLowerCase()) || regle.medicament1.toLowerCase().includes(n.toLowerCase())
    );
    const idx2 = nomsNettoyes.findIndex(
      (n) => n.toLowerCase().includes(regle.medicament2.toLowerCase()) || regle.medicament2.toLowerCase().includes(n.toLowerCase())
    );
    if (idx1 !== -1 && idx2 !== -1 && idx1 !== idx2) {
      interactions.push({
        medicament1: medicaments[idx1],
        medicament2: medicaments[idx2],
        gravite: regle.gravite,
        effet: regle.effet,
        recommandation: regle.recommandation,
      });
    }
  }

  if (profilPatient?.allergenes) {
    for (const med of nomsNettoyes) {
      for (const allergene of profilPatient.allergenes) {
        if (med.toLowerCase().includes(allergene.toLowerCase().slice(0, 4))) {
          interactions.push({
            medicament1: med,
            medicament2: 'ALLERGÈNE',
            gravite: 'CRITIQUE',
            effet: `Réaction allergique potentielle (${allergene})`,
            recommandation: 'Contre-indiqué, consulter un médecin',
          });
        }
      }
    }
  }

  return interactions;
}

export function analyserOrdonnance(medicaments, profilPatient) {
  const interactions = detecterInteractions(medicaments, profilPatient);
  const graviteMax = interactions.reduce((max, i) => {
    const ordre = { CRITIQUE: 4, ÉLEVÉE: 3, MODÉRÉE: 2, MOYENNE: 1 };
    return Math.max(max, ordre[i.gravite] || 0);
  }, 0);

  return {
    securitaire: graviteMax < 2,
    interactions,
    graviteMax: ['', 'MOYENNE', 'MODÉRÉE', 'ÉLEVÉE', 'CRITIQUE'][graviteMax],
    totalInteractions: interactions.length,
    recommandation: graviteMax >= 3
      ? 'Révision médicale urgente requise'
      : graviteMax === 2
        ? 'Surveillance recommandée'
        : 'Aucune interaction significative détectée',
  };
}
