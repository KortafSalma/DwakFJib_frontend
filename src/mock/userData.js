export const mockUserMedications = [
  { id: 1, name: 'Doliprane 500mg', category: 'Antalgiques', price: 25.00, pharmacy: 'Pharmacie El Farah', distance: '0.8km', inStock: true, rating: 4.5 },
  { id: 2, name: 'Glucophage 850mg', category: 'Diabete', price: 40.00, pharmacy: 'Pharmacie Ibn Sina', distance: '1.2km', inStock: true, rating: 4.7 },
  { id: 3, name: 'Mopral 20mg', category: 'Gastro', price: 55.00, pharmacy: 'Pharmacie Al Amal', distance: '2.1km', inStock: false, rating: 4.3 },
  { id: 4, name: 'Advil 400mg', category: 'Anti-inflammatoires', price: 32.00, pharmacy: 'Pharmacie El Farah', distance: '0.8km', inStock: true, rating: 4.8 },
  { id: 5, name: 'Spasfon 80mg', category: 'Antispasmodiques', price: 18.00, pharmacy: 'Pharmacie Ennakhil', distance: '3.5km', inStock: true, rating: 4.4 },
  { id: 6, name: 'Daflon 500mg', category: 'Veinotoniques', price: 48.00, pharmacy: 'Pharmacie Atlas', distance: '4.2km', inStock: true, rating: 4.6 },
  { id: 7, name: 'Zyrtecset 10mg', category: 'Antihistaminiques', price: 22.00, pharmacy: 'Pharmacie Ibn Sina', distance: '1.2km', inStock: true, rating: 4.2 },
  { id: 8, name: 'Seretide 250µg', category: 'Respiratoire', price: 120.00, pharmacy: 'Pharmacie Al Amal', distance: '2.1km', inStock: false, rating: 4.1 },
];

export const mockPharmacies = [
  { id: 1, name: 'Pharmacie El Farah', address: '45 Boulevard Mohammed V, Casablanca', distance: '0.8km', rating: 4.8, open: true, hours: '8h - 22h', phone: '+212 5 22 45 67 89' },
  { id: 2, name: 'Pharmacie Ibn Sina', address: '12 Avenue Hassan II, Rabat', distance: '1.2km', rating: 4.6, open: true, hours: '7h - 23h', phone: '+212 5 37 12 34 56' },
  { id: 3, name: 'Pharmacie Al Amal', address: '78 Rue de la Liberte, Marrakech', distance: '2.1km', rating: 4.4, open: false, hours: '9h - 20h', phone: '+212 5 24 98 76 54' },
  { id: 4, name: 'Pharmacie Ennakhil', address: '90 Avenue Mohammed VI, Agadir', distance: '3.5km', rating: 4.7, open: true, hours: '24h/24', phone: '+212 5 28 11 22 33' },
  { id: 5, name: 'Pharmacie Atlas', address: '33 Boulevard Zerktouni, Fes', distance: '4.2km', rating: 4.3, open: true, hours: '8h - 21h', phone: '+212 5 35 76 54 32' },
];

export const mockReservations = [
  { id: 'RES-001', medication: 'Augmentin 1g', pharmacy: 'Pharmacie El Farah', date: '2026-05-22', quantity: 30, status: 'CONFIRMED', price: 65.00 },
  { id: 'RES-002', medication: 'Glucophage 850mg', pharmacy: 'Pharmacie Ibn Sina', date: '2026-05-20', quantity: 60, status: 'READY', price: 40.00 },
  { id: 'RES-003', medication: 'Advil 400mg', pharmacy: 'Pharmacie El Farah', date: '2026-05-18', quantity: 20, status: 'COMPLETED', price: 32.00 },
  { id: 'RES-004', medication: 'Spasfon 80mg', pharmacy: 'Pharmacie Ennakhil', date: '2026-05-25', quantity: 30, status: 'PENDING', price: 18.00 },
  { id: 'RES-005', medication: 'Zyrtecset 10mg', pharmacy: 'Pharmacie Ibn Sina', date: '2026-05-15', quantity: 30, status: 'CANCELLED', price: 22.00 },
  { id: 'RES-006', medication: 'Daflon 500mg', pharmacy: 'Pharmacie Atlas', date: '2026-05-28', quantity: 30, status: 'CONFIRMED', price: 48.00 },
];

export const mockNotifications = [
  { id: 1, type: 'reservation', title: 'Reservation prete', message: 'Votre Glucophage 850mg est pret a etre recupere', time: 'il y a 2 heures', read: false },
  { id: 2, type: 'reminder', title: 'Rappel de retrait', message: 'N\'oubliez pas de recuperer votre Augmentin 1g demain', time: 'il y a 5 heures', read: false },
  { id: 3, type: 'system', title: 'Profil mis a jour', message: 'Vos informations ont ete mises a jour avec succes', time: 'il y a 1 jour', read: true },
  { id: 4, type: 'reservation', title: 'Reservation confirmee', message: 'Votre reservation de Spasfon 80mg a ete confirmee', time: 'il y a 2 jours', read: true },
  { id: 5, type: 'alert', title: 'Medicament reapprovisionne', message: 'Le Mopral 20mg est de nouveau disponible a la Pharmacie Al Amal', time: 'il y a 3 jours', read: true },
  { id: 6, type: 'system', title: 'Bienvenue', message: 'Bienvenue sur DwakFJib, votre plateforme sante au Maroc', time: 'il y a 1 semaine', read: true },
];

export const mockFavorites = [
  { id: 1, name: 'Doliprane 500mg', category: 'Antalgiques', price: 25.00, pharmacy: 'Pharmacie El Farah', inStock: true },
  { id: 2, name: 'Glucophage 850mg', category: 'Diabete', price: 40.00, pharmacy: 'Pharmacie Ibn Sina', inStock: true },
  { id: 3, name: 'Advil 400mg', category: 'Anti-inflammatoires', price: 32.00, pharmacy: 'Pharmacie El Farah', inStock: true },
  { id: 4, name: 'Spasfon 80mg', category: 'Antispasmodiques', price: 18.00, pharmacy: 'Pharmacie Ennakhil', inStock: true },
  { id: 5, name: 'Daflon 500mg', category: 'Veinotoniques', price: 48.00, pharmacy: 'Pharmacie Atlas', inStock: true },
];

export const mockUserStats = {
  totalReservations: 24,
  completed: 18,
  pending: 2,
  favorites: 5,
  certificates: 3,
  loyaltyPoints: 2450,
  loyaltyTier: 'Or',
};
