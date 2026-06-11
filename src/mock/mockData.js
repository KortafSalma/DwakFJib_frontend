export const demoCredentials = {
  patient: { email: 'patient@dwakfjib.ma', password: 'patient123', role: 'USER', name: 'Amine Benali' },
  pharmacien: { email: 'pharmacien@dwakfjib.ma', password: 'pharmacien123', role: 'PHARMACY', name: 'Dr. Fatima Zahra' },
  distributeur: { email: 'distributeur@dwakfjib.ma', password: 'distributeur123', role: 'DISTRIBUTOR', name: 'Karim El Idrissi' },
  admin: { email: 'admin@dwakfjib.ma', password: 'admin123', role: 'ADMIN', name: 'Admin System' },
};

export const patientProfile = {
  nom: 'Amine Benali',
  email: 'amine.benali@email.ma',
  telephone: '+212 6 12 34 56 78',
  dateNaissance: '1990-05-15',
  groupeSanguin: 'A+',
  allergenes: ['Pénicilline', 'Sulfamides', 'Arachides'],
  maladiesChroniques: ['Asthme', 'Hypertension artérielle'],
  mutuelle: 'CNOPS',
  numeroMutuelle: 'CNOPS-2024-45821',
  adresse: '12 Rue Oued Zem, Casablanca',
  urgentContact: 'Fatima Benali (+212 6 98 76 54 32)',
};

export const patientVisites = [
  { id: 'VIS-001', date: '2026-05-20', medecin: 'Dr. Idrissi', pharmacie: 'Pharmacie El Farah', medicaments: ['Amoxicilline 500mg', 'Paracétamol 1g'], motif: 'Infection respiratoire', cout: 180 },
  { id: 'VIS-002', date: '2026-04-12', medecin: 'Dr. Chafik', pharmacie: 'Pharmacie Ibn Sina', medicaments: ['Ventoline 100µg'], motif: 'Crise d\'asthme légère', cout: 95 },
  { id: 'VIS-003', date: '2026-03-08', medecin: 'Dr. Alaoui', pharmacie: 'Pharmacie du Centre', medicaments: ['Lisinopril 10mg', 'Amlodipine 5mg'], motif: 'Contrôle hypertension', cout: 210 },
  { id: 'VIS-004', date: '2026-02-01', medecin: 'Dr. Idrissi', pharmacie: 'Pharmacie El Farah', medicaments: ['Augmentin 1g'], motif: 'Angine bactérienne', cout: 155 },
  { id: 'VIS-005', date: '2025-12-15', medecin: 'Dr. Benani', pharmacie: 'Pharmacie Al Amal', medicaments: ['Vitamine D3 1000UI'], motif: 'Examen de routine', cout: 75 },
  { id: 'VIS-006', date: '2025-11-20', medecin: 'Dr. Chafik', pharmacie: 'Pharmacie Ibn Sina', medicaments: ['Singulair 10mg'], motif: 'Allergie saisonnière', cout: 130 },
];

export const patientRenouvellements = [
  { id: 'REN-001', medicament: 'Lisinopril 10mg', dosage: '1 comprimé/jour', stockJours: 12, statut: 'URGENT', pharmacie: 'Pharmacie El Farah' },
  { id: 'REN-002', medicament: 'Amlodipine 5mg', dosage: '1 comprimé/jour', stockJours: 25, statut: 'BIENTOT', pharmacie: 'Pharmacie du Centre' },
  { id: 'REN-003', medicament: 'Ventoline 100µg', dosage: 'À la demande', stockJours: 60, statut: 'OK', pharmacie: 'Pharmacie Ibn Sina' },
  { id: 'REN-004', medicament: 'Vitamine D3 1000UI', dosage: '1 capsule/semaine', stockJours: 180, statut: 'OK', pharmacie: 'Pharmacie Al Amal' },
];

export const patientFidelite = {
  points: 2450,
  niveau: 'Or',
  prochainNiveau: 'Platine',
  pointsRestants: 550,
  avantages: ['Livraison gratuite', 'Réduction 10%', 'Consultation prioritaire'],
  historiquePoints: [
    { date: '2026-05-20', points: 180, source: 'Achat Amoxicilline', type: 'gagnés' },
    { date: '2026-05-01', points: 500, source: 'Bonus fidélité mensuel', type: 'gagnés' },
    { date: '2026-04-12', points: 95, source: 'Achat Ventoline', type: 'gagnés' },
    { date: '2026-03-08', points: 210, source: 'Achat Lisinopril + Amlodipine', type: 'gagnés' },
    { date: '2026-02-15', points: 150, source: 'Réduction utilisée', type: 'dépensés' },
  ],
  recompensesDisponibles: [
    { id: 'R-01', nom: 'Bon d\'achat 50 DH', points: 1000, description: 'Valable dans toutes les pharmacies partenaires' },
    { id: 'R-02', nom: 'Bilan santé gratuit', points: 2000, description: 'Inclut tension, glycémie et cholestérol' },
    { id: 'R-03', nom: 'Remise 20% sur prochaine visite', points: 3000, description: 'Consultation médicale complète' },
  ],
};

export const pharmacienData = {
  nom: 'Dr. Fatima Zahra',
  pharmacie: 'Pharmacie El Farah',
  adresse: '45 Boulevard Mohammed V, Casablanca',
  telephone: '+212 5 22 45 67 89',
  ice: 'ICE-2024-785412',
  licence: 'PH-2024-1589',
  patientsFideles: [
    { id: 1, nom: 'Amine Benali', visites: 18, totalDepense: '4 580 DH', dernierAchat: '2026-05-20', fidelite: 'Or' },
    { id: 2, nom: 'Salma El Ouafi', visites: 14, totalDepense: '3 920 DH', dernierAchat: '2026-05-18', fidelite: 'Or' },
    { id: 3, nom: 'Hassan Mokhtari', visites: 11, totalDepense: '2 850 DH', dernierAchat: '2026-05-15', fidelite: 'Argent' },
    { id: 4, nom: 'Nadia Berrada', visites: 9, totalDepense: '2 100 DH', dernierAchat: '2026-05-12', fidelite: 'Argent' },
    { id: 5, nom: 'Omar Tazi', visites: 7, totalDepense: '1 670 DH', dernierAchat: '2026-05-10', fidelite: 'Bronze' },
    { id: 6, nom: 'Leila Benjelloun', visites: 6, totalDepense: '1 430 DH', dernierAchat: '2026-05-08', fidelite: 'Bronze' },
    { id: 7, nom: 'Youssef El Fassi', visites: 5, totalDepense: '1 220 DH', dernierAchat: '2026-05-05', fidelite: 'Bronze' },
    { id: 8, nom: 'Khadija Amrani', visites: 4, totalDepense: '980 DH', dernierAchat: '2026-05-01', fidelite: 'Bronze' },
  ],
  stock: [
    { id: 1, nom: 'Doliprane 500mg', categorie: 'Antalgiques', stock: 245, seuilAlerte: 30, prix: 25.00, statut: 'OK' },
    { id: 2, nom: 'Efferalgan 1g', categorie: 'Antalgiques', stock: 520, seuilAlerte: 50, prix: 35.00, statut: 'OK' },
    { id: 3, nom: 'Mopral 20mg', categorie: 'Gastro', stock: 15, seuilAlerte: 25, prix: 55.00, statut: 'ALERTE' },
    { id: 4, nom: 'Ventoline 100µg', categorie: 'Respiratoire', stock: 8, seuilAlerte: 20, prix: 45.00, statut: 'ALERTE' },
    { id: 5, nom: 'Augmentin 1g', categorie: 'Antibiotiques', stock: 0, seuilAlerte: 15, prix: 65.00, statut: 'RUPTURE' },
    { id: 6, nom: 'Glucophage 850mg', categorie: 'Diabète', stock: 189, seuilAlerte: 40, prix: 40.00, statut: 'OK' },
    { id: 7, nom: 'Advil 400mg', categorie: 'Anti-inflammatoires', stock: 320, seuilAlerte: 60, prix: 32.00, statut: 'OK' },
    { id: 8, nom: 'Spasfon 80mg', categorie: 'Antispasmodiques', stock: 0, seuilAlerte: 20, prix: 18.00, statut: 'RUPTURE' },
    { id: 9, nom: 'Daflon 500mg', categorie: 'Veinotoniques', stock: 156, seuilAlerte: 30, prix: 48.00, statut: 'OK' },
    { id: 10, nom: 'Clamoxyl 500mg', categorie: 'Antibiotiques', stock: 45, seuilAlerte: 20, prix: 42.00, statut: 'OK' },
  ],
  ventesHebdo: [
    { jour: 'Lun', ventes: 2850, objectif: 2500 },
    { jour: 'Mar', ventes: 3200, objectif: 2500 },
    { jour: 'Mer', ventes: 1950, objectif: 2500 },
    { jour: 'Jeu', ventes: 4100, objectif: 2500 },
    { jour: 'Ven', ventes: 3650, objectif: 2500 },
    { jour: 'Sam', ventes: 1800, objectif: 2000 },
    { jour: 'Dim', ventes: 950, objectif: 1500 },
  ],
  activiteRecente: [
    { id: 1, action: 'Stock mis à jour', detail: 'Amoxicilline 500mg +50 unités', timestamp: '2026-05-20 14:32' },
    { id: 2, action: 'Réservation traitée', detail: 'R-001 par Amine Benali', timestamp: '2026-05-20 13:15' },
    { id: 3, action: 'Commande reçue', detail: 'CMD-002 de DistriPharma', timestamp: '2026-05-20 11:45' },
    { id: 4, action: 'Alerte stock bas', detail: 'Lisinopril 10mg sous seuil', timestamp: '2026-05-20 10:00' },
    { id: 5, action: 'Patient fidélisé', detail: 'Salma El Ouafi niveau Or', timestamp: '2026-05-19 16:20' },
  ],
  iaAlertes: [
    { id: 'IA-01', type: 'PREDICTION', message: 'Rupture prévue : Augmentin 1g dans 3 jours', priorite: 'HAUTE', date: '2026-05-20' },
    { id: 'IA-02', type: 'INTERACTION', message: 'Interaction détectée : Mopral + Aspirine chez patient #12', priorite: 'CRITIQUE', date: '2026-05-20' },
    { id: 'IA-03', type: 'DEMANDE', message: 'Tendance haussière : Zyrtecset 10mg (+35% vs mois dernier)', priorite: 'MOYENNE', date: '2026-05-19' },
    { id: 'IA-04', type: 'FIDELITE', message: 'Patient Amine Benali éligible bonus fidélité Platine', priorite: 'BASSE', date: '2026-05-18' },
  ],
};

export const distributeurData = {
  nom: 'Karim El Idrissi',
  entreprise: 'DistriPharma Maroc',
  adresse: 'Zone Industrielle Sidi Bernoussi, Casablanca',
  telephone: '+212 5 22 88 99 00',
  ice: 'ICE-2024-998877',
  registreCommerce: 'RC-2024-CASA-4521',
  kpis: {
    revenuTotal: '285 400 DH',
    commandesMois: 142,
    pharmaciesActives: 38,
    produitsDisponibles: 245,
    tauxLivraison: '96.8%',
    noteMoyenne: '4.7 / 5',
  },
  livraisonsEnAttente: [
    { id: 'LIV-001', pharmacie: 'Pharmacie El Farah', articles: 45, statut: 'EN_TRANSIT', livreur: 'Hassan El Omari', estimation: '2026-05-21', progression: 65 },
    { id: 'LIV-002', pharmacie: 'Pharmacie Ibn Sina', articles: 32, statut: 'PREPARATION', livreur: 'Non assigné', estimation: '2026-05-22', progression: 30 },
    { id: 'LIV-003', pharmacie: 'Pharmacie du Centre', articles: 56, statut: 'EN_ATTENTE', livreur: 'Non assigné', estimation: '2026-05-23', progression: 0 },
    { id: 'LIV-004', pharmacie: 'Pharmacie Al Amal', articles: 28, statut: 'LIVRE', livreur: 'Rachid El Fassi', estimation: '2026-05-20', progression: 100 },
    { id: 'LIV-005', pharmacie: 'Pharmacie Atlas', articles: 38, statut: 'EN_TRANSIT', livreur: 'Youssef Ait Ali', estimation: '2026-05-21', progression: 45 },
    { id: 'LIV-006', pharmacie: 'Pharmacie Al Karama', articles: 20, statut: 'EN_ATTENTE', livreur: 'Non assigné', estimation: '2026-05-24', progression: 0 },
  ],
  topPartenaires: [
    { nom: 'Pharmacie El Farah', commandes: 45, revenu: '85 500 DH' },
    { nom: 'Pharmacie Ibn Sina', commandes: 38, revenu: '72 100 DH' },
    { nom: 'Pharmacie du Centre', commandes: 32, revenu: '58 900 DH' },
    { nom: 'Pharmacie Al Amal', commandes: 28, revenu: '45 400 DH' },
    { nom: 'Pharmacie Atlas', commandes: 22, revenu: '42 800 DH' },
  ],
  livreurs: [
    { id: 1, nom: 'Hassan El Omari', statut: 'actif', livraisonsAujourdhui: 5, note: 4.9 },
    { id: 2, nom: 'Youssef Ait Ali', statut: 'actif', livraisonsAujourdhui: 3, note: 4.8 },
    { id: 3, nom: 'Rachid El Fassi', statut: 'disponible', livraisonsAujourdhui: 0, note: 4.7 },
    { id: 4, nom: 'Mohamed Bennis', statut: 'actif', livraisonsAujourdhui: 4, note: 4.6 },
    { id: 5, nom: 'Hicham Ouazzani', statut: 'congé', livraisonsAujourdhui: 0, note: 4.5 },
  ],
  tendanceCommandes: [
    { mois: 'Jan', valeur: 185 },
    { mois: 'Fév', valeur: 212 },
    { mois: 'Mar', valeur: 198 },
    { mois: 'Avr', valeur: 245 },
    { mois: 'Mai', valeur: 282 },
    { mois: 'Juin', valeur: 268 },
  ],
  tendanceRevenu: [
    { mois: 'Jan', valeur: 18500 },
    { mois: 'Fév', valeur: 21200 },
    { mois: 'Mar', valeur: 19800 },
    { mois: 'Avr', valeur: 24500 },
    { mois: 'Mai', valeur: 28200 },
    { mois: 'Juin', valeur: 26800 },
  ],
  produitsDemande: [
    { nom: 'Doliprane 500mg', commandes: 342, tendance: 'hausse' },
    { nom: 'Augmentin 1g', commandes: 298, tendance: 'hausse' },
    { nom: 'Spasfon 80mg', commandes: 275, tendance: 'hausse' },
    { nom: 'Glucophage 850mg', commandes: 245, tendance: 'hausse' },
    { nom: 'Daflon 500mg', commandes: 189, tendance: 'baisse' },
    { nom: 'Mopral 20mg', commandes: 156, tendance: 'baisse' },
  ],
};

export const interactionsMedicamenteuses = [
  { medicament1: 'Lopril 20mg', medicament2: 'Advil 400mg', gravite: 'ÉLEVÉE', effet: 'Réduction de l\'effet antihypertenseur, risque d\'insuffisance rénale', recommandation: 'Surveiller la tension artérielle et la fonction rénale' },
  { medicament1: 'Aspirine 500mg', medicament2: 'Augmentin 1g', gravite: 'MODÉRÉE', effet: 'Augmentation du risque hémorragique', recommandation: 'Surveiller INR, ajuster dose si nécessaire' },
  { medicament1: 'Glucophage 850mg', medicament2: 'Advil 400mg', gravite: 'MODÉRÉE', effet: 'Risque d\'acidose lactique accru', recommandation: 'Surveiller la fonction rénale' },
  { medicament1: 'Daflon 500mg', medicament2: 'Antifongiques azolés', gravite: 'ÉLEVÉE', effet: 'Augmentation du risque de myopathie/rhabdomyolyse', recommandation: 'Éviter l\'association ou réduire dose statine' },
  { medicament1: 'Ventoline 100µg', medicament2: 'Bêta-bloquants', gravite: 'MOYENNE', effet: 'Diminution de l\'efficacité bronchodilatatrice', recommandation: 'Utiliser un bêta-2 agoniste avec prudence' },
  { medicament1: 'Mopral 20mg', medicament2: 'Plavix 75mg', gravite: 'MODÉRÉE', effet: 'Réduction de l\'activation du clopidogrel', recommandation: 'Utiliser un IPP sans interaction (pantoprazole)' },
  { medicament1: 'Augmentin 1g', medicament2: 'Méthotrexate', gravite: 'ÉLEVÉE', effet: 'Augmentation de la toxicité du méthotrexate', recommandation: 'Éviter l\'association, surveiller les taux' },
];
