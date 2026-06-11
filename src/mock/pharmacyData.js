export const mockMedications = [
  { id: 1, name: 'Doliprane 500mg', category: 'Antalgiques', dosage: '500mg', stock: 245, status: 'IN_STOCK', price: 25.00, expiryDate: '2027-03-15', reservations: 8, supplier: 'Sanofi Maroc' },
  { id: 2, name: 'Augmentin 1g', category: 'Antibiotiques', dosage: '1g', stock: 189, status: 'IN_STOCK', price: 65.00, expiryDate: '2026-11-20', reservations: 12, supplier: 'GSK Maroc' },
  { id: 3, name: 'Mopral 20mg', category: 'Gastro', dosage: '20mg', stock: 15, status: 'LOW_STOCK', price: 55.00, expiryDate: '2026-08-10', reservations: 5, supplier: 'AstraZeneca' },
  { id: 4, name: 'Spasfon 80mg', category: 'Antispasmodiques', dosage: '80mg', stock: 0, status: 'OUT_OF_STOCK', price: 18.00, expiryDate: '2026-12-01', reservations: 0, supplier: 'Teofarma' },
  { id: 5, name: 'Glucophage 850mg', category: 'Diabete', dosage: '850mg', stock: 156, status: 'IN_STOCK', price: 40.00, expiryDate: '2027-06-30', reservations: 3, supplier: 'Merck Maroc' },
  { id: 6, name: 'Advil 400mg', category: 'Anti-inflammatoires', dosage: '400mg', stock: 320, status: 'IN_STOCK', price: 32.00, expiryDate: '2028-01-15', reservations: 15, supplier: 'Pfizer Maroc' },
  { id: 7, name: 'Clamoxyl 500mg', category: 'Antibiotiques', dosage: '500mg', stock: 8, status: 'LOW_STOCK', price: 42.00, expiryDate: '2026-07-22', reservations: 2, supplier: 'GSK Maroc' },
  { id: 8, name: 'Amlor 5mg', category: 'Cardiologie', dosage: '5mg', stock: 0, status: 'OUT_OF_STOCK', price: 60.00, expiryDate: '2026-09-14', reservations: 0, supplier: 'Pfizer Maroc' },
  { id: 9, name: 'Daflon 500mg', category: 'Veinotoniques', dosage: '500mg', stock: 78, status: 'IN_STOCK', price: 48.00, expiryDate: '2027-02-28', reservations: 6, supplier: 'Servier Maroc' },
  { id: 10, name: 'Voltarene 50mg', category: 'Anti-inflammatoires', dosage: '50mg', stock: 45, status: 'IN_STOCK', price: 22.00, expiryDate: '2026-06-30', reservations: 4, supplier: 'Novartis Maroc' },
  { id: 11, name: 'Ventoline 100µg', category: 'Respiratoire', dosage: '100µg', stock: 12, status: 'LOW_STOCK', price: 45.00, expiryDate: '2027-04-10', reservations: 7, supplier: 'GSK Maroc' },
  { id: 12, name: 'Tardyferon 80mg', category: 'Supplements', dosage: '80mg', stock: 0, status: 'EXPIRED', price: 30.00, expiryDate: '2025-12-01', reservations: 0, supplier: 'Pierre Fabre' },
  { id: 13, name: 'Seretide 250µg', category: 'Respiratoire', dosage: '250µg', stock: 95, status: 'IN_STOCK', price: 120.00, expiryDate: '2027-08-15', reservations: 9, supplier: 'GSK Maroc' },
  { id: 14, name: 'Lasilix 40mg', category: 'Cardiologie', dosage: '40mg', stock: 5, status: 'LOW_STOCK', price: 20.00, expiryDate: '2026-10-05', reservations: 1, supplier: 'Sanofi Maroc' },
  { id: 15, name: 'Zyrtecset 10mg', category: 'Antihistaminiques', dosage: '10mg', stock: 167, status: 'IN_STOCK', price: 22.00, expiryDate: '2027-11-30', reservations: 11, supplier: 'UCB Maroc' },
];

export const mockReservations = [
  { id: 'R-001', medication: 'Augmentin 1g', user: 'Amine Benali', date: '2026-05-20', quantity: 30, deposit: 65.00, status: 'PENDING' },
  { id: 'R-002', medication: 'Glucophage 850mg', user: 'Salma El Ouafi', date: '2026-05-19', quantity: 60, deposit: 40.00, status: 'PENDING' },
  { id: 'R-003', medication: 'Advil 400mg', user: 'Hassan Mokhtari', date: '2026-05-18', quantity: 20, deposit: 32.00, status: 'PAID' },
  { id: 'R-004', medication: 'Daflon 500mg', user: 'Nadia Berrada', date: '2026-05-17', quantity: 30, deposit: 48.00, status: 'COMPLETED' },
  { id: 'R-005', medication: 'Mopral 20mg', user: 'Omar Tazi', date: '2026-05-16', quantity: 30, deposit: 55.00, status: 'CANCELLED' },
  { id: 'R-006', medication: 'Seretide 250µg', user: 'Leila Benjelloun', date: '2026-05-21', quantity: 90, deposit: 120.00, status: 'PENDING' },
];

export const mockOrders = [
  { id: 'ORD-001', supplier: 'DistriPharma Maroc', items: 5, total: 1250.00, status: 'DELIVERED', date: '2026-05-18' },
  { id: 'ORD-002', supplier: 'Medirex Maroc', items: 3, total: 890.50, status: 'SHIPPED', date: '2026-05-19' },
  { id: 'ORD-003', supplier: 'Sothema Distribution', items: 8, total: 2100.75, status: 'PROCESSING', date: '2026-05-20' },
  { id: 'ORD-004', supplier: 'Cooper Pharma Logistics', items: 2, total: 450.00, status: 'PENDING', date: '2026-05-20' },
  { id: 'ORD-005', supplier: 'Maghreb Pharma Distribution', items: 4, total: 1680.00, status: 'SHIPPED', date: '2026-05-17' },
  { id: 'ORD-006', supplier: 'DistriPharma Maroc', items: 6, total: 1950.25, status: 'DELIVERED', date: '2026-05-15' },
  { id: 'ORD-007', supplier: 'Medirex Maroc', items: 3, total: 780.00, status: 'CANCELLED', date: '2026-05-14' },
  { id: 'ORD-008', supplier: 'Cooper Pharma Logistics', items: 7, total: 2450.50, status: 'PROCESSING', date: '2026-05-21' },
];

export const mockSalesData = [
  { label: 'Lun', value: 1250 },
  { label: 'Mar', value: 1890 },
  { label: 'Mer', value: 1450 },
  { label: 'Jeu', value: 2100 },
  { label: 'Ven', value: 1780 },
  { label: 'Sam', value: 980 },
  { label: 'Dim', value: 650 },
];

export const mockActivityLogs = [
  { id: 1, action: 'Stock mis a jour', detail: 'Doliprane 500mg +50 unites', user: 'Dr. Fatima Zahra', timestamp: '2026-05-20 14:32', type: 'stock' },
  { id: 2, action: 'Reservation creee', detail: 'R-001 par Amine Benali', user: 'System', timestamp: '2026-05-20 13:15', type: 'reservation' },
  { id: 3, action: 'Commande recue', detail: 'ORD-002 de Medirex Maroc', user: 'System', timestamp: '2026-05-20 11:45', type: 'order' },
  { id: 4, action: 'Alerte stock bas', detail: 'Mopral 20mg sous seuil critique', user: 'System', timestamp: '2026-05-20 10:00', type: 'alert' },
  { id: 5, action: 'Prix mis a jour', detail: 'Glucophage 850mg 40,00 DH → 38,00 DH', user: 'Admin', timestamp: '2026-05-19 16:20', type: 'price' },
  { id: 6, action: 'Medicament ajoute', detail: 'Seretide 250µg ajoute au stock', user: 'Dr. Fatima Zahra', timestamp: '2026-05-19 14:00', type: 'stock' },
  { id: 7, action: 'Alerte peremption', detail: 'Tardyferon 80mg expire', user: 'System', timestamp: '2026-05-19 09:00', type: 'alert' },
  { id: 8, action: 'Reservation terminee', detail: 'R-004 recuperee par Nadia Berrada', user: 'System', timestamp: '2026-05-18 15:30', type: 'reservation' },
];
