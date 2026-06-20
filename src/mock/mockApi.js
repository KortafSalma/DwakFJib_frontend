import {
  demoCredentials,
  patientProfile,
  patientVisites,
  patientRenouvellements,
  patientFidelite,
  pharmacienData,
  distributeurData,
  interactionsMedicamenteuses,
} from './mockData';

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

let reservations = [
  { id: 1, medicament: 'Augmentin 1g', pharmacie: 'Pharmacie El Farah', statut: 'terminee', date: '2026-05-18', quantite: 2, montant: 130.00 },
  { id: 2, medicament: 'Doliprane 500mg', pharmacie: 'Pharmacie Ibn Sina', statut: 'confirmée', date: '2026-05-20', quantite: 1, montant: 25.00 },
  { id: 3, medicament: 'Ventoline 100µg', pharmacie: 'Pharmacie El Farah', statut: 'en_attente', date: '2026-05-21', quantite: 1, montant: 45.00 },
  { id: 4, medicament: 'Glucophage 850mg', pharmacie: 'Pharmacie Al Amal', statut: 'confirmée', date: '2026-05-22', quantite: 3, montant: 120.00 },
];

let medications = [
  { id: 1, nom: 'Doliprane 500mg', categorie: 'Antalgiques', stock: 245, seuilAlerte: 30, prix: 25.00, statut: 'OK' },
  { id: 2, nom: 'Efferalgan 1g', categorie: 'Antalgiques', stock: 520, seuilAlerte: 50, prix: 35.00, statut: 'OK' },
  { id: 3, nom: 'Advil 400mg', categorie: 'Anti-inflammatoires', stock: 320, seuilAlerte: 60, prix: 32.00, statut: 'OK' },
  { id: 4, nom: 'Augmentin 1g', categorie: 'Antibiotiques', stock: 180, seuilAlerte: 25, prix: 65.00, statut: 'OK' },
  { id: 5, nom: 'Clamoxyl 500mg', categorie: 'Antibiotiques', stock: 250, seuilAlerte: 30, prix: 42.00, statut: 'OK' },
  { id: 6, nom: 'Mopral 20mg', categorie: 'Gastro', stock: 15, seuilAlerte: 25, prix: 55.00, statut: 'ALERTE' },
  { id: 7, nom: 'Spasfon 80mg', categorie: 'Antispasmodiques', stock: 420, seuilAlerte: 50, prix: 18.00, statut: 'OK' },
  { id: 8, nom: 'Glucophage 850mg', categorie: 'Diabète', stock: 189, seuilAlerte: 40, prix: 40.00, statut: 'OK' },
  { id: 9, nom: 'Amlor 5mg', categorie: 'Cardiologie', stock: 156, seuilAlerte: 30, prix: 60.00, statut: 'OK' },
  { id: 10, nom: 'Ventoline 100µg', categorie: 'Respiratoire', stock: 8, seuilAlerte: 20, prix: 45.00, statut: 'ALERTE' },
  { id: 11, nom: 'Daflon 500mg', categorie: 'Veinotoniques', stock: 178, seuilAlerte: 30, prix: 48.00, statut: 'OK' },
  { id: 12, nom: 'Zyrtecset 10mg', categorie: 'Antihistaminiques', stock: 95, seuilAlerte: 30, prix: 22.00, statut: 'OK' },
];

let conversations = [
  { id: 1, participant: 'Pharmacie El Farah', lastMessage: 'Votre commande est prête', date: '2026-05-20T14:30:00', unread: 2 },
  { id: 2, participant: 'Dr. Fatima Zahra', lastMessage: 'Merci pour votre visite', date: '2026-05-19T10:15:00', unread: 0 },
  { id: 3, participant: 'DistriPharma Maroc', lastMessage: 'Livraison prévue demain', date: '2026-05-18T16:45:00', unread: 1 },
  { id: 4, participant: 'Pharmacie Ibn Sina', lastMessage: 'Stock disponible', date: '2026-05-17T09:00:00', unread: 0 },
];

let messages = {};
conversations.forEach((c) => {
  messages[c.id] = [
    { id: `${c.id}-1`, conversationId: c.id, sender: 'them', text: c.lastMessage, timestamp: c.date, read: c.unread === 0 },
    { id: `${c.id}-2`, conversationId: c.id, sender: 'me', text: 'D\'accord, merci !', timestamp: c.date, read: true },
  ];
});

let pharmaciesList = [
  { id: 1, name: 'Pharmacie El Farah', email: 'contact@elfarah.ma', phone: '+212 5 22 45 67 89', address: '45 Bd Mohammed V', city: 'Casablanca', owner: 'admin', is_verified: false, document_count: 3, rating: 4.5, created_at: '2026-05-10T10:00:00Z', user: { name: 'Admin' } },
  { id: 2, name: 'Pharmacie Ibn Sina', email: 'contact@ibnsina.ma', phone: '+212 5 22 33 44 55', address: '12 Rue El Firdaous', city: 'Rabat', owner: 'admin', is_verified: false, document_count: 2, rating: 4.2, created_at: '2026-05-12T14:30:00Z', user: { name: 'Admin' } },
  { id: 3, name: 'Pharmacie du Centre', email: 'info@centrapharma.ma', phone: '+212 5 22 11 22 33', address: '8 Place des Nations', city: 'Casablanca', owner: 'admin', is_verified: true, document_count: 5, rating: 4.8, created_at: '2026-04-01T08:00:00Z', user: { name: 'Admin' } },
  { id: 4, name: 'Pharmacie Al Amal', email: 'alamal@pharma.ma', phone: '+212 5 22 77 88 99', address: '3 Rue Ibn Battouta', city: 'Marrakech', owner: 'admin', is_verified: false, document_count: 1, rating: 3.9, created_at: '2026-05-15T09:00:00Z', user: { name: 'Admin' } },
];

let orders = [
  { id: 'CMD-001', pharmacie: 'Pharmacie El Farah', articles: 12, montant: '2 450 DH', statut: 'en_cours', date: '2026-05-19' },
  { id: 'CMD-002', pharmacie: 'Pharmacie Ibn Sina', articles: 8, montant: '1 820 DH', statut: 'livre', date: '2026-05-18' },
  { id: 'CMD-003', pharmacie: 'Pharmacie du Centre', articles: 15, montant: '3 600 DH', statut: 'en_attente', date: '2026-05-20' },
  { id: 'CMD-004', pharmacie: 'Pharmacie Al Amal', articles: 6, montant: '980 DH', statut: 'livre', date: '2026-05-16' },
  { id: 'CMD-005', pharmacie: 'Pharmacie Atlas', articles: 10, montant: '2 100 DH', statut: 'en_cours', date: '2026-05-19' },
];

let users = [
  { id: 1, name: 'Amine Benali', email: 'patient@dwakfjib.ma', role: 'USER', statut: 'actif', date: '2026-01-15' },
  { id: 2, name: 'Dr. Fatima Zahra', email: 'pharmacien@dwakfjib.ma', role: 'PHARMACY', statut: 'actif', date: '2026-02-01' },
  { id: 3, name: 'Karim El Idrissi', email: 'distributeur@dwakfjib.ma', role: 'DISTRIBUTOR', statut: 'actif', date: '2026-02-15' },
  { id: 4, name: 'Admin System', email: 'admin@dwakfjib.ma', role: 'ADMIN', statut: 'actif', date: '2026-01-01' },
  { id: 5, name: 'Salma El Ouafi', email: 'salma@email.ma', role: 'USER', statut: 'actif', date: '2026-03-01' },
  { id: 6, name: 'Hassan Mokhtari', email: 'hassan@email.ma', role: 'USER', statut: 'actif', date: '2026-03-10' },
  { id: 7, name: 'Nadia Berrada', email: 'nadia@email.ma', role: 'USER', statut: 'actif', date: '2026-03-15' },
  { id: 8, name: 'Pharmacie Ibn Sina', email: 'ibnsina@email.ma', role: 'PHARMACY', statut: 'en_attente', date: '2026-04-01' },
  { id: 9, name: 'DistriMed Maroc', email: 'distrimed@email.ma', role: 'DISTRIBUTOR', statut: 'en_attente', date: '2026-04-05' },
  { id: 10, name: 'Omar Tazi', email: 'omar@email.ma', role: 'USER', statut: 'actif', date: '2026-04-10' },
];

let notificationsList = [
      { id: 1, type: 'reservation', title: 'Nouvelle réservation', message: 'Amine Benali a réservé Augmentin 1g', lu: false, date: '2026-05-20T10:30:00' },
      { id: 2, type: 'stock', title: 'Alerte stock bas', message: 'Mopral 20mg sous le seuil minimum', lu: false, date: '2026-05-20T09:15:00' },
  { id: 3, type: 'livraison', title: 'Livraison en cours', message: 'Commande CMD-001 expédiée vers votre pharmacie', lu: true, date: '2026-05-19T16:00:00' },
  { id: 4, type: 'commande', title: 'Nouvelle commande', message: 'Commande CMD-003 reçue de Pharmacie du Centre', lu: false, date: '2026-05-20T08:45:00' },
  { id: 5, type: 'system', title: 'Mise à jour système', message: 'Plateforme mise à jour vers v2.4.1', lu: true, date: '2026-05-18T22:00:00' },
      { id: 6, type: 'reservation', title: 'Réservation confirmée', message: 'Votre réservation de Daflon 500mg est confirmée', lu: false, date: '2026-05-20T11:00:00' },
  { id: 7, type: 'fidelite', title: 'Niveau atteint', message: 'Félicitations ! Vous avez atteint le niveau Or', lu: true, date: '2026-05-15T14:00:00' },
];

const extractId = (path, pattern) => {
  const match = path.match(pattern);
  return match ? match[1] : null;
};

const respond = (data, status = 200) => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
  headers: { 'content-type': 'application/json' },
});

const respondPaginated = (data, page = 1, perPage = 10) => ({
  data: {
    data,
    meta: { current_page: page, last_page: Math.ceil(data.length / perPage), per_page: perPage, total: data.length },
  },
  status: 200,
  statusText: 'OK',
  headers: { 'content-type': 'application/json' },
});

export const mockHandler = async (config) => {
  const url = (config.url || '').replace(/https?:\/\/[^/]+/, '').replace(/^\/api/, '');
  const method = (config.method || 'get').toLowerCase();
  const body = config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : {};

  await delay(150);

  // Auth
  if (url === '/login' && method === 'post') {
    const cred = Object.values(demoCredentials).find((c) => c.email === body.email && c.password === body.password);
    if (cred) {
      return respond({
        token: `mock_${btoa(cred.email)}_${Date.now()}`,
        user: { id: `usr_${cred.role.toLowerCase()}`, name: cred.name, email: cred.email, role: cred.role },
      });
    }
    const existingUser = users.find((u) => u.email === body.email);
    if (existingUser) {
      return respond({
        token: `mock_${btoa(existingUser.email)}_${Date.now()}`,
        user: { id: `usr_${existingUser.id}`, name: existingUser.name, email: existingUser.email, role: existingUser.role },
      });
    }
    return respond({ message: 'Identifiants incorrects' }, 401);
  }

  if (url === '/register' && method === 'post') {
    const newUser = {
      id: users.length + 1,
      name: body.name || body.email.split('@')[0],
      email: body.email,
      role: body.role || 'USER',
      statut: 'actif',
      date: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    return respond({
      token: `mock_${btoa(newUser.email)}_${Date.now()}`,
      user: { id: `usr_${newUser.id}`, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  }

  if (url === '/logout' && method === 'post') {
    return respond({ message: 'Déconnexion réussie' });
  }

  if (url === '/me' && method === 'get') {
    const token = config.headers?.Authorization?.replace('Bearer ', '') || '';
    const email = token ? atob(token.replace('mock_', '').split('_')[0]) : '';
    const cred = Object.values(demoCredentials).find((c) => c.email === email);
    if (cred) {
      return respond({
        id: `usr_${cred.role.toLowerCase()}`,
        name: cred.name,
        email: cred.email,
        role: cred.role,
      });
    }
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return respond({
        id: `usr_${existingUser.id}`,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      });
    }
    return respond({
      id: `usr_${email.split('@')[0]}`,
      name: email.split('@')[0],
      email: email,
      role: 'USER',
    });
  }

  if (url === '/password/forgot' && method === 'post') {
    return respond({ message: 'Email de réinitialisation envoyé' });
  }

  if (url === '/password/reset' && method === 'post') {
    return respond({ message: 'Mot de passe réinitialisé avec succès' });
  }

  // Pharmacies
  if (url.match(/^\/pharmacies(?:\?|$)/) && method === 'get') {
    const searchParams = new URLSearchParams(url.split('?')[1] || '');
    const verified = searchParams.get('verified');
    const search = searchParams.get('search');
    let filtered = [...pharmaciesList];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(s) || p.city.toLowerCase().includes(s));
    }
    if (verified !== null) {
      filtered = filtered.filter((p) => String(p.is_verified) === verified);
    }
    return respondPaginated(filtered);
  }

  if (method === 'post' && url === '/pharmacies') {
    const newPharmacy = {
      id: Date.now(),
      name: body.name || 'New Pharmacy',
      email: body.email || '',
      phone: body.phone || '',
      address: body.address || '',
      city: body.city || '',
      owner: body.owner || 'Admin',
      is_verified: false,
      created_at: new Date().toISOString(),
      document_count: 0,
      rating: 0,
      user: { name: body.owner || 'Admin' },
    };
    pharmaciesList.unshift(newPharmacy);
    return respond({ ...newPharmacy, message: 'Pharmacie créée avec succès' });
  }

  // Admin
  if (url === '/admin/dashboard' && method === 'get') {
    return respond({
      total_users: 2450,
      total_pharmacies: 128,
      total_distributors: 45,
      total_reservations: 1890,
      total_orders: 890,
      revenu_mensuel: '1 280 000 DH',
      croissance: '+12.5%',
      users_actifs: 1890,
      pharmacies_actives: 118,
      utilisateurs_par_role: { users: 1800, pharmacies: 128, distributors: 45, admins: 3 },
      reservations_par_statut: { en_attente: 245, confirmée: 890, annulée: 120, terminee: 635 },
      tendance_inscriptions: [
        { mois: 'Jan', value: 120 }, { mois: 'Fév', value: 145 }, { mois: 'Mar', value: 168 },
        { mois: 'Avr', value: 192 }, { mois: 'Mai', value: 210 }, { mois: 'Juin', value: 235 },
      ],
      tendance_revenu: [
        { mois: 'Jan', value: 850000 }, { mois: 'Fév', value: 920000 }, { mois: 'Mar', value: 1020000 },
        { mois: 'Avr', value: 1150000 }, { mois: 'Mai', value: 1240000 }, { mois: 'Juin', value: 1280000 },
      ],
    });
  }

  if (url.startsWith('/admin/users') && method === 'get') {
    return respondPaginated(users);
  }

  if (url.match(/^\/admin\/users\/\d+$/) && method === 'get') {
    const id = parseInt(extractId(url, /\/admin\/users\/(\d+)/));
    return respond(users.find((u) => u.id === id) || users[0]);
  }

  if (url.match(/^\/admin\/users\/\d+$/) && method === 'put') {
    return respond({ ...body, id: parseInt(extractId(url, /\/admin\/users\/(\d+)/)), message: 'Utilisateur mis à jour' });
  }

  if (url.match(/^\/admin\/users\/\d+$/) && method === 'delete') {
    return respond({ message: 'Utilisateur supprimé' });
  }

  if (url.match(/\/admin\/users\/\d+\/ban/) && method === 'post') {
    return respond({ message: 'Utilisateur banni' });
  }

  if (url.match(/\/admin\/users\/\d+\/unban/) && method === 'post') {
    return respond({ message: 'Utilisateur débanni' });
  }

  if (url.match(/\/admin\/users\/\d+\/role/) && method === 'put') {
    return respond({ message: 'Rôle modifié' });
  }

  if (method === 'post' && url === '/admin/users') {
    return respond({ id: users.length + 1, ...body, message: 'Utilisateur créé' });
  }

  if (url === '/admin/pharmacies' && method === 'get') {
    return respondPaginated(users.filter((u) => u.role === 'PHARMACY'));
  }

  if (url.match(/\/admin\/pharmacies\/\d+\/verify/) && method === 'post') {
    return respond({ message: 'Pharmacie vérifiée' });
  }

  if (url === '/admin/distributors' && method === 'get') {
    return respondPaginated(users.filter((u) => u.role === 'DISTRIBUTOR'));
  }

  if (url === '/admin/analytics' && method === 'get') {
    return respond({
      utilisateurs_par_role: [
        { name: 'Patients', value: 1800, color: '#14B8A6' },
        { name: 'Pharmacies', value: 128, color: '#F59E0B' },
        { name: 'Distributeurs', value: 45, color: '#6366F1' },
      ],
      reservations_par_mois: [
        { mois: 'Jan', value: 120 }, { mois: 'Fév', value: 150 }, { mois: 'Mar', value: 180 },
        { mois: 'Avr', value: 210 }, { mois: 'Mai', value: 260 }, { mois: 'Juin', value: 290 },
      ],
      top_medications: [
        { nom: 'Doliprane 500mg', ventes: 1250 },
        { nom: 'Augmentin 1g', ventes: 980 },
        { nom: 'Spasfon 80mg', ventes: 750 },
        { nom: 'Glucophage 850mg', ventes: 620 },
        { nom: 'Advil 400mg', ventes: 580 },
      ],
    });
  }

  if (url.startsWith('/admin/analytics/revenue') && method === 'get') {
    return respond({ data: [], series: [
      { name: 'Revenu', data: [850000, 920000, 1020000, 1150000, 1240000, 1280000] },
    ]});
  }

  if (url.startsWith('/admin/analytics/reservations') && method === 'get') {
    return respond({ data: [], series: [
      { name: 'Réservations', data: [120, 150, 180, 210, 260, 290] },
    ]});
  }

  if (url.startsWith('/admin/analytics/top-medications') && method === 'get') {
    return respond([
      { nom: 'Doliprane 500mg', ventes: 1250 },
      { nom: 'Augmentin 1g', ventes: 980 },
      { nom: 'Spasfon 80mg', ventes: 750 },
      { nom: 'Glucophage 850mg', ventes: 620 },
      { nom: 'Advil 400mg', ventes: 580 },
    ]);
  }

  if (url.startsWith('/admin/analytics/top-pharmacies') && method === 'get') {
    return respond([
      { nom: 'Pharmacie El Farah', commandes: 45, revenu: '85 500 DH' },
      { nom: 'Pharmacie Ibn Sina', commandes: 38, revenu: '72 100 DH' },
      { nom: 'Pharmacie du Centre', commandes: 32, revenu: '58 900 DH' },
    ]);
  }

  if (url.startsWith('/admin/analytics/activity') && method === 'get') {
    return respondPaginated([
      { id: 1, action_type: 'user', description: 'Nouvel utilisateur inscrit', user_name: 'Omar Tazi', created_at: '2026-05-20T14:32:00', type: 'user' },
      { id: 2, action_type: 'pharmacy', description: 'Pharmacie vérifiée', user_name: 'Admin System', created_at: '2026-05-20T13:15:00', type: 'pharmacy' },
      { id: 3, action_type: 'reservation', description: 'Réservation confirmée', user_name: 'Amine Benali', created_at: '2026-05-20T11:45:00', type: 'reservation' },
      { id: 4, action_type: 'alert', description: 'Alerte stock bas', user_name: 'Dr. Fatima Zahra', created_at: '2026-05-20T10:00:00', type: 'alert' },
      { id: 5, action_type: 'system', description: 'Mise à jour système v2.4.1', user_name: 'System', created_at: '2026-05-19T22:00:00', type: 'system' },
    ]);
  }

  if (url === '/admin/logs' && method === 'get') {
    return respondPaginated([
      { id: 1, user: 'Admin System', action: 'Connexion', details: 'Admin connecté', date: '2026-05-20 08:00:00' },
      { id: 2, user: 'Dr. Fatima Zahra', action: 'Stock mis à jour', details: 'Doliprane 500mg +50', date: '2026-05-20 07:30:00' },
      { id: 3, user: 'Amine Benali', action: 'Réservation', details: 'Spasfon 80mg', date: '2026-05-19 18:00:00' },
      { id: 4, user: 'Admin System', action: 'Utilisateur approuvé', details: 'Pharmacie Atlas', date: '2026-05-19 15:00:00' },
    ]);
  }

  if (url === '/admin/settings' && method === 'get') {
    return respond({
      site_name: 'DWAFIJBK',
      maintenance_mode: false,
      enable_registration: true,
      require_verification: true,
      max_login_attempts: 5,
      session_lifetime: 120,
      notifications_enabled: true,
      email_notifications: true,
      api_rate_limit: 60,
    });
  }

  // Pharmacy
  if (url === '/pharmacy/dashboard' && method === 'get') {
    return respond({
      ...pharmacienData,
      stats: {
        reservations_aujourdhui: 12,
        commandes_encours: 3,
        stock_total: 1548,
        alertes: 4,
        revenu_mois: '45 200 DH',
        patients_servis: 89,
      },
    });
  }

  if (url === '/pharmacy/medications' && method === 'get') {
    return respondPaginated(medications);
  }

  if (url.match(/^\/pharmacy\/medications\/\d+$/) && method === 'get') {
    const id = parseInt(extractId(url, /\/pharmacy\/medications\/(\d+)/));
    return respond(medications.find((m) => m.id === id) || medications[0]);
  }

  if (method === 'post' && url === '/pharmacy/medications') {
    const newMed = { id: medications.length + 1, ...body, statut: 'OK' };
    medications.push(newMed);
    return respond(newMed);
  }

  if (url.match(/^\/pharmacy\/medications\/\d+$/) && method === 'put') {
    return respond({ ...body, message: 'Médicament mis à jour' });
  }

  if (url.match(/^\/pharmacy\/medications\/\d+$/) && method === 'delete') {
    return respond({ message: 'Médicament supprimé' });
  }

  if (url === '/pharmacy/stock-history' && method === 'get') {
    return respondPaginated([
      { id: 1, medicament: 'Augmentin 1g', type: 'entrée', quantite: 50, date: '2026-05-20', responsable: 'Dr. Fatima Zahra' },
      { id: 2, medicament: 'Efferalgan 1g', type: 'sortie', quantite: 20, date: '2026-05-19', responsable: 'Vente' },
      { id: 3, medicament: 'Mopral 20mg', type: 'entrée', quantite: 100, date: '2026-05-18', responsable: 'DistriPharma' },
    ]);
  }

  if (url === '/pharmacy/stock/adjust' && method === 'post') {
    return respond({ message: 'Stock ajusté' });
  }

  if (url === '/pharmacy/reservations' && method === 'get') {
    return respondPaginated(reservations);
  }

  if (method === 'post' && url === '/pharmacy/reservations') {
    return respond({ id: reservations.length + 1, ...body, statut: 'en_attente', message: 'Réservation créée' });
  }

  if (url.match(/^\/pharmacy\/reservations\/\d+$/) && method === 'put') {
    return respond({ message: 'Réservation mise à jour' });
  }

  if (url.match(/^\/pharmacy\/reservations\/\d+$/) && method === 'delete') {
    return respond({ message: 'Réservation annulée' });
  }

  if (url === '/pharmacy/reviews' && method === 'get') {
    return respondPaginated([
      { id: 1, user: 'Amine Benali', note: 5, commentaire: 'Excellent service !', date: '2026-05-18' },
      { id: 2, user: 'Salma El Ouafi', note: 4, commentaire: 'Bon accueil, un peu d\'attente', date: '2026-05-15' },
    ]);
  }

  if (method === 'post' && url === '/pharmacy/reviews') {
    return respond({ id: Date.now(), ...body, message: 'Avis ajouté' });
  }

  if (url.match(/^\/pharmacy\/reviews\/\d+$/) && method === 'delete') {
    return respond({ message: 'Avis supprimé' });
  }

  if (url === '/pharmacy/orders' && method === 'get') {
    return respondPaginated(orders);
  }

  if (method === 'post' && url === '/pharmacy/orders') {
    const newOrder = { id: `CMD-${String(orders.length + 1).padStart(3, '0')}`, ...body, statut: 'en_attente', date: new Date().toISOString().split('T')[0] };
    orders.push(newOrder);
    return respond({ ...newOrder, message: 'Commande créée' });
  }

  if (url === '/pharmacy/alerts' && method === 'get') {
    return respond(pharmacienData.iaAlertes);
  }

  if (url === '/pharmacy/analytics' && method === 'get') {
    return respond({
      ventes_par_jour: pharmacienData.ventesHebdo,
      top_medicaments: [
        { nom: 'Doliprane 500mg', ventes: 320 },
        { nom: 'Augmentin 1g', ventes: 245 },
        { nom: 'Glucophage 850mg', ventes: 189 },
      ],
      revenu_mensuel: '45 200 DH',
      evolution: '+8.3%',
      patients_nouveaux: 23,
    });
  }

  if (url === '/pharmacy/notifications' && method === 'get') {
    return respondPaginated(notificationsList.filter((n) => n.type === 'stock' || n.type === 'reservation'));
  }

  if (url === '/pharmacy/settings' && method === 'get') {
    return respond({
      nom: 'Pharmacie El Farah',
      adresse: '45 Boulevard Mohammed V, Casablanca',
      telephone: '+212 5 22 45 67 89',
      email: 'el-farah@pharma.ma',
      horaires: { lundi: '08:00-20:00', samedi: '09:00-18:00', dimanche: 'fermé' },
      notifications: { stock_alert: true, reservation: true, commande: true },
      devise: 'MAD',
    });
  }

  if (url === '/pharmacy/loyal-patients' && method === 'get') {
    return respond(pharmacienData.patientsFideles);
  }

  // Distributor
  if (url === '/distributor/dashboard' && method === 'get') {
    return respond({
      ...distributeurData,
      stats_rapides: {
        commandes_aujourdhui: 18,
        livraisons_encours: 4,
        livreurs_disponibles: 6,
        taux_satisfaction: '96.8%',
      },
    });
  }

  if (url === '/distributor/orders' && method === 'get') {
    return respondPaginated(orders);
  }

  if (url.match(/^\/distributor\/orders\/\d+$/) && method === 'get') {
    return respond(orders[0]);
  }

  if (url.match(/\/distributor\/orders\/\d+\/status/) && method === 'put') {
    return respond({ message: 'Statut commande mis à jour' });
  }

  if (url.match(/^\/distributor\/orders\/\d+$/) && method === 'delete') {
    return respond({ message: 'Commande supprimée' });
  }

  if (url === '/distributor/shipments' && method === 'get') {
    return respondPaginated(distributeurData.livraisonsEnAttente);
  }

  if (url === '/distributor/deliveries' && method === 'get') {
    return respondPaginated(distributeurData.livraisonsEnAttente);
  }

  if (url.match(/\/distributor\/deliveries\/\d+\/status/) && method === 'put') {
    return respond({ message: 'Statut livraison mis à jour' });
  }

  if (url === '/distributor/tracking' && method === 'get') {
    return respond(distributeurData.livraisonsEnAttente);
  }

  if (url === '/distributor/routes' && method === 'get') {
    return respond({
      itineraire_optimise: [
        { etape: 1, pharmacie: 'Pharmacie El Farah', distance: '2.3 km', temps: '8 min' },
        { etape: 2, pharmacie: 'Pharmacie Ibn Sina', distance: '1.8 km', temps: '6 min' },
        { etape: 3, pharmacie: 'Pharmacie du Centre', distance: '3.1 km', temps: '12 min' },
      ],
      livreurs: distributeurData.livreurs,
    });
  }

  if (url === '/distributor/revenue' && method === 'get') {
    return respond({
      revenu_total: '285 400 DH',
      revenu_mois: '48 200 DH',
      evolution: '+15.3%',
      tendance: distributeurData.tendanceRevenu,
      top_clients: distributeurData.topPartenaires,
    });
  }

  if (url === '/distributor/analytics' && method === 'get') {
    return respond({
      kpis: distributeurData.kpis,
      tendance_commandes: distributeurData.tendanceCommandes,
      produits_demande: distributeurData.produitsDemande,
    });
  }

  if (url === '/distributor/notifications' && method === 'get') {
    return respondPaginated(notificationsList.filter((n) => n.type === 'livraison' || n.type === 'commande'));
  }

  // User (Patient)
  if (url === '/user/dashboard' && method === 'get') {
    return respond({
      profile: patientProfile,
      visites: patientVisites,
      renouvellements: patientRenouvellements,
      fidelite: patientFidelite,
      reservations_actives: reservations.filter((r) => r.statut === 'en_attente' || r.statut === 'confirmée'),
      notifications_non_lues: notificationsList.filter((n) => !n.lu).length,
    });
  }

  if (url === '/user/profile' && method === 'get') {
    return respond(patientProfile);
  }

  if (url === '/user/profile' && method === 'put') {
    return respond({ ...patientProfile, ...body, message: 'Profil mis à jour' });
  }

  if (url.includes('/medications/search') && method === 'get') {
    const searchParams = new URLSearchParams(url.split('?')[1] || '');
    const q = (searchParams.get('q') || '').toLowerCase();
    const category = searchParams.get('category') || '';
    const inStock = searchParams.get('in_stock');
    const categoryMap = {
      'pain relief': 'Antalgiques', 'antibiotics': 'Antibiotiques', 'vitamins': 'Supplements',
      'baby care': 'Antalgiques', 'skin care': 'Dermatologie', 'chronic care': 'Cardiologie',
    };
    const results = medications.filter((m) => {
      const matchesQ = !q || m.nom.toLowerCase().includes(q) || (m.categorie || '').toLowerCase().includes(q);
      const targetCat = categoryMap[category.toLowerCase()] || category;
      const matchesCat = !category || (m.categorie || '').toLowerCase() === targetCat.toLowerCase();
      const matchesStock = inStock !== 'true' || m.stock > 0;
      return matchesQ && matchesCat && matchesStock;
    }).map((m) => ({
      id: m.id,
      name: m.nom,
      category: m.categorie,
      price: m.prix,
      stock: m.stock,
      dosage: m.categorie,
      pharmacy: { name: 'Pharmacie El Farah', distance: '0.8 km' },
      is_low_stock: m.stock > 0 && m.stock <= m.seuilAlerte,
      is_expired: m.statut === 'RUPTURE' || m.statut === 'EXPIRED',
    }));
    return respond({ data: results, meta: { current_page: 1, last_page: 1, per_page: 20, total: results.length } });
  }

  if (url.includes('/pharmacies/nearby') && method === 'get') {
    return respondPaginated([
      { id: 1, nom: 'Pharmacie El Farah', adresse: '45 Bd Mohammed V, Casablanca', distance: '0.8 km', telephone: '+212 5 22 45 67 89', note: 4.8, disponible: true, garde: false },
      { id: 2, nom: 'Pharmacie Ibn Sina', adresse: '12 Rue El Firdaous, Casablanca', distance: '1.2 km', telephone: '+212 5 22 33 44 55', note: 4.5, disponible: true, garde: false },
      { id: 3, nom: 'Pharmacie du Centre', adresse: '8 Place des Nations, Casablanca', distance: '1.5 km', telephone: '+212 5 22 11 22 33', note: 4.3, disponible: true, garde: true },
      { id: 4, nom: 'Pharmacie Al Amal', adresse: '3 Rue Ibn Battouta, Casablanca', distance: '2.1 km', telephone: '+212 5 22 77 88 99', note: 4.6, disponible: true, garde: false },
    ]);
  }

  if (url === '/user/reservations' && method === 'get') {
    return respondPaginated(reservations);
  }

  if (method === 'post' && url === '/user/reservations') {
    const newReservation = { id: reservations.length + 1, ...body, statut: 'en_attente', date: new Date().toISOString().split('T')[0] };
    reservations.push(newReservation);
    return respond({ ...newReservation, message: 'Réservation effectuée' });
  }

  if (url.match(/^\/user\/reservations\/\d+$/) && method === 'delete') {
    return respond({ message: 'Réservation annulée' });
  }

  if (url === '/user/favorites' && method === 'get') {
    return respond([
      { id: 1, pharmacie_id: 1, nom: 'Pharmacie El Farah', adresse: '45 Bd Mohammed V', note: 4.8 },
      { id: 2, pharmacie_id: 4, nom: 'Pharmacie Al Amal', adresse: '3 Rue Ibn Battouta', note: 4.6 },
    ]);
  }

  if (method === 'post' && url === '/user/favorites') {
    return respond({ id: Date.now(), ...body, message: 'Ajouté aux favoris' });
  }

  if (url.match(/^\/user\/favorites\/\d+$/) && method === 'delete') {
    return respond({ message: 'Retiré des favoris' });
  }

  if (url === '/user/favorites/check' && method === 'post') {
    return respond({ is_favorite: true });
  }

  if (url === '/user/certificates' && method === 'get') {
    return respondPaginated([
      { id: 1, nom: 'Ordonnance - Amoxicilline', date: '2026-05-15', medecin: 'Dr. Idrissi', statut: 'valide' },
      { id: 2, nom: 'Analyse sanguine', date: '2026-04-20', medecin: 'Dr. Chafik', statut: 'valide' },
    ]);
  }

  if (method === 'post' && url === '/user/certificates') {
    return respond({ id: Date.now(), ...body, message: 'Certificat téléchargé' });
  }

  if (url.match(/^\/user\/certificates\/\d+$/) && method === 'delete') {
    return respond({ message: 'Certificat supprimé' });
  }

  if (url === '/user/notifications' && method === 'get') {
    return respondPaginated(notificationsList);
  }

  if (url === '/user/notification-preferences' && method === 'put') {
    return respond({ message: 'Préférences mises à jour' });
  }

  // Messaging
  if (url === '/conversations' && method === 'get') {
    return respondPaginated(conversations);
  }

  if (method === 'post' && url === '/conversations') {
    const newConv = { id: conversations.length + 1, ...body, lastMessage: 'Nouvelle conversation', date: new Date().toISOString(), unread: 0 };
    conversations.push(newConv);
    return respond({ ...newConv, message: 'Conversation créée' });
  }

  if (url.match(/^\/conversations\/\d+$/) && method === 'get') {
    const id = parseInt(extractId(url, /\/conversations\/(\d+)/));
    return respond(conversations.find((c) => c.id === id) || conversations[0]);
  }

  if (url.match(/\/conversations\/\d+\/read/) && method === 'put') {
    return respond({ message: 'Conversation marquée comme lue' });
  }

  if (url === '/conversations/unread-count' && method === 'get') {
    const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);
    return respond({ unread_count: totalUnread });
  }

  if (url.match(/^\/conversations\/\d+\/messages$/) && method === 'get') {
    const id = parseInt(extractId(url, /\/conversations\/(\d+)\/messages/));
    return respondPaginated(messages[id] || messages[1]);
  }

  if (method === 'post' && url === '/messages') {
    return respond({ id: Date.now(), ...body, timestamp: new Date().toISOString(), message: 'Message envoyé' });
  }

  if (url.match(/\/messages\/\d+\/read/) && method === 'put') {
    return respond({ message: 'Message marqué comme lu' });
  }

  if (url.match(/^\/messages\/\d+$/) && method === 'delete') {
    return respond({ message: 'Message supprimé' });
  }

  // Notifications
  if (url === '/notifications' && method === 'get') {
    return respondPaginated(notificationsList);
  }

  if (url === '/notifications/unread' && method === 'get') {
    return respondPaginated(notificationsList.filter((n) => !n.lu));
  }

  if (url === '/notifications/stats' && method === 'get') {
    return respond({ total: notificationsList.length, non_lues: notificationsList.filter((n) => !n.lu).length, par_type: { reservation: 2, stock: 1, livraison: 1, commande: 1, system: 1 } });
  }

  if (url === '/notifications/mark-all-read' && method === 'post') {
    notificationsList.forEach((n) => { n.lu = true; });
    return respond({ message: 'Toutes les notifications marquées comme lues' });
  }

  if (url.match(/\/notifications\/\d+\/read/) && method === 'post') {
    return respond({ message: 'Notification marquée comme lue' });
  }

  if (url.match(/^\/notifications\/\d+$/) && method === 'delete') {
    return respond({ message: 'Notification supprimée' });
  }

  if (method === 'post' && url === '/notifications') {
    return respond({ id: Date.now(), ...body, message: 'Notification créée' });
  }

  // Inventory
  if (url === '/inventory/expiry-monitoring' && method === 'get') {
    return respondPaginated([
      { id: 1, medicament: 'Doliprane 500mg', lot: 'LOT-2024-A', dateExpiration: '2026-08-15', stock: 245, joursRestant: 65, statut: 'OK' },
      { id: 2, medicament: 'Augmentin 1g', lot: 'LOT-2024-B', dateExpiration: '2026-06-01', stock: 50, joursRestant: 20, statut: 'ALERTE' },
      { id: 3, medicament: 'Ventoline 100µg', lot: 'LOT-2023-C', dateExpiration: '2026-07-01', stock: 8, joursRestant: 40, statut: 'ATTENTION' },
    ]);
  }

  if (url === '/inventory/low-stock' && method === 'get') {
    return respondPaginated([
      { id: 6, nom: 'Mopral 20mg', stock: 15, seuilAlerte: 25, recommandation: 'Commander 50 unités' },
      { id: 10, nom: 'Ventoline 100µg', stock: 8, seuilAlerte: 20, recommandation: 'Commander d\'urgence' },
    ]);
  }

  if (url === '/inventory/movement' && method === 'get') {
    return respondPaginated([
      { id: 1, medicament: 'Augmentin 1g', type: 'entrée', quantite: 50, date: '2026-05-20', motif: 'Commande fournisseur' },
      { id: 2, medicament: 'Efferalgan 1g', type: 'sortie', quantite: 20, date: '2026-05-19', motif: 'Vente client' },
      { id: 3, medicament: 'Mopral 20mg', type: 'sortie', quantite: 5, date: '2026-05-19', motif: 'Réservation' },
    ]);
  }

  if (url === '/inventory/reorder' && method === 'get') {
    return respondPaginated([
      { id: 1, nom: 'Clamoxyl 500mg', stock: 0, recommandation: 'Commander 100 unités', priorite: 'URGENTE' },
      { id: 6, nom: 'Mopral 20mg', stock: 15, recommandation: 'Commander 50 unités', priorite: 'HAUTE' },
      { id: 10, nom: 'Ventoline 100µg', stock: 8, recommandation: 'Commander 30 unités', priorite: 'HAUTE' },
    ]);
  }

  if (url === '/inventory/trends' && method === 'get') {
    return respond({
      tendances: [
        { mois: 'Jan', ventes: 12000, achats: 15000 },
        { mois: 'Fév', ventes: 14500, achats: 12000 },
        { mois: 'Mar', ventes: 16800, achats: 18000 },
        { mois: 'Avr', ventes: 19200, achats: 16000 },
        { mois: 'Mai', ventes: 21000, achats: 22000 },
      ],
      predictions: [
        { nom: 'Doliprane 500mg', prediction: 'Augmentation de 15% ce mois' },
        { nom: 'Zyrtecset 10mg', prediction: 'Hausse saisonnière attendue' },
      ],
    });
  }

  // Maps
  if (url.includes('/maps/pharmacies') && method === 'get') {
    return respond([
      { id: 1, nom: 'Pharmacie El Farah', lat: 33.5731, lng: -7.5898, adresse: '45 Bd Mohammed V', telephone: '+212 5 22 45 67 89', garde: false },
      { id: 2, nom: 'Pharmacie Ibn Sina', lat: 33.5780, lng: -7.5970, adresse: '12 Rue El Firdaous', telephone: '+212 5 22 33 44 55', garde: false },
      { id: 3, nom: 'Pharmacie du Centre', lat: 33.5755, lng: -7.5922, adresse: '8 Place des Nations', telephone: '+212 5 22 11 22 33', garde: true },
      { id: 4, nom: 'Pharmacie Al Amal', lat: 33.5700, lng: -7.6000, adresse: '3 Rue Ibn Battouta', telephone: '+212 5 22 77 88 99', garde: false },
    ]);
  }

  if (url.includes('/maps/tracking') && method === 'get') {
    return respond(distributeurData.livraisonsEnAttente);
  }

  if (url.includes('/maps/locator') && method === 'get') {
    return respond([
      { id: 1, nom: 'Pharmacie El Farah', lat: 33.5731, lng: -7.5898, adresse: '45 Bd Mohammed V', disponible: true, distance: '0.8 km' },
      { id: 2, nom: 'Pharmacie Ibn Sina', lat: 33.5780, lng: -7.5970, adresse: '12 Rue El Firdaous', disponible: true, distance: '1.2 km' },
    ]);
  }

  if (url.includes('/maps/emergency') && method === 'get') {
    return respond([
      { id: 3, nom: 'Pharmacie du Centre', lat: 33.5755, lng: -7.5922, adresse: '8 Place des Nations', garde: true, telephone: '+212 5 22 11 22 33' },
    ]);
  }

  // Fallback for unmatched routes
  console.warn(`[MockAPI] Unmatched: ${method.toUpperCase()} ${url}`);
  return respond({ data: [], message: 'Mock endpoint not implemented' }, 200);
};
