export const mockShipments = [
  { id: 'LIV-001', pharmacy: 'Pharmacie El Farah', origin: 'Entrepot Central Casa', destination: 'Casablanca Centre', status: 'IN_TRANSIT', items: 45, weight: '120kg', driver: 'Hassan El Omari', estimatedDelivery: '2026-05-21', progress: 65 },
  { id: 'LIV-002', pharmacy: 'Pharmacie Ibn Sina', origin: 'Depot Nord Rabat', destination: 'Rabat Ville', status: 'SHIPPED', items: 32, weight: '85kg', driver: 'Youssef Ait Ali', estimatedDelivery: '2026-05-22', progress: 30 },
  { id: 'LIV-003', pharmacy: 'Pharmacie Al Amal', origin: 'Entrepot Central Casa', destination: 'Marrakech Gueliz', status: 'DELIVERED', items: 28, weight: '75kg', driver: 'Rachid El Fassi', estimatedDelivery: '2026-05-20', progress: 100 },
  { id: 'LIV-004', pharmacy: 'Pharmacie Ennakhil', origin: 'Depot Sud Agadir', destination: 'Agadir Centre', status: 'PROCESSING', items: 56, weight: '150kg', driver: 'Non assigne', estimatedDelivery: '2026-05-23', progress: 10 },
  { id: 'LIV-005', pharmacy: 'Pharmacie Atlas', origin: 'Entrepot Central Casa', destination: 'Fes Ville Nouvelle', status: 'PENDING', items: 20, weight: '55kg', driver: 'Non assigne', estimatedDelivery: '2026-05-24', progress: 0 },
  { id: 'LIV-006', pharmacy: 'Pharmacie Al Karama', origin: 'Depot Nord Tanger', destination: 'Tanger Centre', status: 'IN_TRANSIT', items: 38, weight: '95kg', driver: 'Mohamed Bennis', estimatedDelivery: '2026-05-21', progress: 45 },
  { id: 'LIV-007', pharmacy: 'Pharmacie Ibn Sina', origin: 'Entrepot Central Casa', destination: 'Rabat Agdal', status: 'CANCELLED', items: 15, weight: '40kg', driver: 'N/A', estimatedDelivery: '2026-05-20', progress: 0 },
  { id: 'LIV-008', pharmacy: 'Pharmacie El Farah', origin: 'Depot Sud', destination: 'Casablanca Maârif', status: 'DELIVERED', items: 42, weight: '110kg', driver: 'Hassan El Omari', estimatedDelivery: '2026-05-19', progress: 100 },
];

export const mockOrders = [
  { id: 'CMD-001', pharmacy: 'Pharmacie El Farah', items: 12, total: 2450.00, status: 'PENDING', date: '2026-05-20', priority: 'high' },
  { id: 'CMD-002', pharmacy: 'Pharmacie Ibn Sina', items: 8, total: 1890.50, status: 'PENDING', date: '2026-05-20', priority: 'medium' },
  { id: 'CMD-003', pharmacy: 'Pharmacie Al Amal', items: 15, total: 3200.75, status: 'PROCESSING', date: '2026-05-19', priority: 'high' },
  { id: 'CMD-004', pharmacy: 'Pharmacie Ennakhil', items: 6, total: 980.00, status: 'PROCESSING', date: '2026-05-19', priority: 'low' },
  { id: 'CMD-005', pharmacy: 'Pharmacie Atlas', items: 20, total: 4150.25, status: 'SHIPPED', date: '2026-05-18', priority: 'high' },
  { id: 'CMD-006', pharmacy: 'Pharmacie El Farah', items: 10, total: 1750.00, status: 'DELIVERED', date: '2026-05-17', priority: 'medium' },
  { id: 'CMD-007', pharmacy: 'Pharmacie Ibn Sina', items: 5, total: 890.00, status: 'DELIVERED', date: '2026-05-16', priority: 'low' },
  { id: 'CMD-008', pharmacy: 'Pharmacie Al Karama', items: 18, total: 3680.50, status: 'CANCELLED', date: '2026-05-15', priority: 'medium' },
];

export const mockDrivers = [
  { id: 1, name: 'Hassan El Omari', status: 'active', currentShipment: 'LIV-001', deliveries: 12, rating: 4.9 },
  { id: 2, name: 'Youssef Ait Ali', status: 'active', currentShipment: 'LIV-002', deliveries: 8, rating: 4.8 },
  { id: 3, name: 'Rachid El Fassi', status: 'idle', currentShipment: null, deliveries: 15, rating: 4.7 },
  { id: 4, name: 'Mohamed Bennis', status: 'active', currentShipment: 'LIV-006', deliveries: 10, rating: 4.6 },
  { id: 5, name: 'Hicham Ouazzani', status: 'offline', currentShipment: null, deliveries: 7, rating: 4.5 },
];

export const mockDeliveryStats = {
  total: 156,
  inTransit: 23,
  delivered: 118,
  delayed: 8,
  onTimeRate: 94.5,
  avgDeliveryTime: '2.4h',
  cities: 12,
  activeDrivers: 18,
};

export const mockRevenueData = [
  { label: 'Janv', value: 18500 },
  { label: 'Fev', value: 21200 },
  { label: 'Mars', value: 19800 },
  { label: 'Avr', value: 24500 },
  { label: 'Mai', value: 28200 },
  { label: 'Juin', value: 26800 },
];

export const mockRoutes = [
  { id: 'R-001', name: 'Casablanca Centre → Maârif', stops: 4, distance: '12.5km', estimatedTime: '45min', status: 'active', driver: 'Hassan El Omari' },
  { id: 'R-002', name: 'Rabat Agdal → Hay Riad', stops: 3, distance: '18.2km', estimatedTime: '1h 10min', status: 'active', driver: 'Youssef Ait Ali' },
  { id: 'R-003', name: 'Marrakech Gueliz → Massira', stops: 5, distance: '22.8km', estimatedTime: '1h 30min', status: 'planned', driver: 'Non assigne' },
  { id: 'R-004', name: 'Tanger Centre → Gare TGV', stops: 2, distance: '35.0km', estimatedTime: '55min', status: 'planned', driver: 'Non assigne' },
  { id: 'R-005', name: 'Fes Ville Nouvelle → Atlas', stops: 6, distance: '28.5km', estimatedTime: '2h', status: 'completed', driver: 'Rachid El Fassi' },
];
