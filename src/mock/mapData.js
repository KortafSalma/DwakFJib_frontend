export const mockMapPharmacies = [
  { id: 1, name: 'Pharmacie El Farah', lat: 33.5731, lng: -7.5898, address: '45 Boulevard Mohammed V, Casablanca', distance: '0.8km', rating: 4.8, open: true, hours: '8h - 22h', phone: '+212 5 22 45 67 89', stock: ['Doliprane', 'Glucophage', 'Advil'], emergency: true },
  { id: 2, name: 'Pharmacie Ibn Sina', lat: 34.0209, lng: -6.8416, address: '12 Avenue Hassan II, Rabat', distance: '1.2km', rating: 4.6, open: true, hours: '7h - 23h', phone: '+212 5 37 12 34 56', stock: ['Glucophage', 'Zyrtecset'], emergency: false },
  { id: 3, name: 'Pharmacie Al Amal', lat: 31.6295, lng: -7.9811, address: '78 Rue de la Liberte, Marrakech', distance: '2.1km', rating: 4.4, open: false, hours: '9h - 20h', phone: '+212 5 24 98 76 54', stock: ['Mopral', 'Seretide'], emergency: false },
  { id: 4, name: 'Pharmacie Ennakhil', lat: 30.4278, lng: -9.5981, address: '90 Avenue Mohammed VI, Agadir', distance: '3.5km', rating: 4.7, open: true, hours: '24h/24', phone: '+212 5 28 11 22 33', stock: ['Spasfon', 'Doliprane', 'Advil'], emergency: true },
  { id: 5, name: 'Pharmacie Atlas', lat: 34.0331, lng: -4.9998, address: '33 Boulevard Zerktouni, Fes', distance: '4.2km', rating: 4.3, open: true, hours: '8h - 21h', phone: '+212 5 35 76 54 32', stock: ['Daflon'], emergency: false },
];

export const mockDeliveryRoute = {
  id: 'LIV-001',
  driver: 'Hassan El Omari',
  status: 'IN_TRANSIT',
  progress: 65,
  origin: { lat: 33.5898, lng: -7.6103, name: 'Entrepot DistriPharma Casa' },
  destination: { lat: 33.5731, lng: -7.5898, name: 'Pharmacie El Farah' },
  checkpoints: [
    { lat: 33.5898, lng: -7.6103, label: 'Entrepot', time: '10:00' },
    { lat: 33.5820, lng: -7.6020, label: 'Avenue Hassan II', time: '10:15' },
    { lat: 33.5770, lng: -7.5950, label: 'Place Mohammed V', time: '10:30' },
    { lat: 33.5731, lng: -7.5898, label: 'Pharmacie El Farah', time: '10:45' },
  ],
  eta: '10:45',
  items: 45,
};

export const mockEmergencyMedications = [
  { name: 'Augmentin 1g', category: 'Antibiotiques', available: ['Pharmacie El Farah', 'Pharmacie Ennakhil'], nearest: '0.8km' },
  { name: 'Ventoline 100µg', category: 'Urgence respiratoire', available: ['Pharmacie Ennakhil'], nearest: '3.5km' },
  { name: 'Glucophage 850mg', category: 'Diabete', available: ['Pharmacie El Farah', 'Pharmacie Ibn Sina'], nearest: '0.8km' },
  { name: 'Lasilix 40mg', category: 'Cardiologie', available: ['Pharmacie El Farah'], nearest: '0.8km' },
  { name: 'Seretide 250µg', category: 'Respiratoire', available: ['Pharmacie Ennakhil', 'Pharmacie Atlas'], nearest: '3.5km' },
];
