export const mockNotifications = [
  { id: 1, type: 'RESERVATION', priority: 'HIGH', title: 'Reservation Ready', message: 'Your Amoxicillin 500mg is ready for pickup at HealthPlus Pharmacy', time: '2 min ago', read: false, action: 'View Details' },
  { id: 2, type: 'EMERGENCY', priority: 'CRITICAL', title: 'Emergency Medicine Alert', message: 'EpiPen now available at Wellness Hub (3.5km away)', time: '5 min ago', read: false, action: 'View Location' },
  { id: 3, type: 'DELIVERY', priority: 'MEDIUM', title: 'Delivery Update', message: 'Your order ORD-001 is out for delivery, ETA 30 minutes', time: '15 min ago', read: false, action: 'Track' },
  { id: 4, type: 'STOCK', priority: 'LOW', title: 'Medication Restocked', message: 'Lisinopril 10mg is back in stock at GreenCross Pharmacy', time: '1 hour ago', read: true, action: 'Reserve' },
  { id: 5, type: 'RESERVATION', priority: 'HIGH', title: 'Reservation Confirmed', message: 'Your Metformin 850mg reservation has been confirmed', time: '2 hours ago', read: true, action: 'View' },
  { id: 6, type: 'SYSTEM', priority: 'LOW', title: 'Profile Updated', message: 'Your profile information has been updated successfully', time: '3 hours ago', read: true, action: null },
  { id: 7, type: 'MESSAGE', priority: 'MEDIUM', title: 'Pharmacy Message', message: 'HealthPlus Pharmacy: Your prescription has been verified', time: '5 hours ago', read: true, action: 'Reply' },
  { id: 8, type: 'DELIVERY', priority: 'HIGH', title: 'Delivery Delayed', message: 'Your shipment SHP-002 is delayed by 2 hours due to traffic', time: '6 hours ago', read: true, action: 'View Details' },
  { id: 9, type: 'STOCK', priority: 'CRITICAL', title: 'Low Stock Warning', message: 'Insulin levels critically low at MediCare Center', time: '8 hours ago', read: true, action: 'View' },
  { id: 10, type: 'SYSTEM', priority: 'LOW', title: 'Welcome Back', message: 'Welcome back to DwakFJib Healthcare', time: '1 day ago', read: true, action: null },
];

export const mockActivityFeed = [
  { id: 1, type: 'reservation', action: 'Reservation Created', detail: 'Amoxicillin 500mg at HealthPlus Pharmacy', time: '2 min ago', user: 'You' },
  { id: 2, type: 'delivery', action: 'Order Shipped', detail: 'ORD-001 dispatched from Central Warehouse', time: '15 min ago', user: 'System' },
  { id: 3, type: 'stock', action: 'Stock Updated', detail: 'Metformin 850mg +50 units at MediCare Center', time: '1 hour ago', user: 'Pharmacy' },
  { id: 4, type: 'system', action: 'Profile Updated', detail: 'Contact information changed', time: '3 hours ago', user: 'You' },
  { id: 5, type: 'reservation', action: 'Reservation Completed', detail: 'Ibuprofen 400mg picked up', time: '5 hours ago', user: 'You' },
  { id: 6, type: 'delivery', action: 'Delivery Confirmed', detail: 'SHP-003 delivered to GreenCross Pharmacy', time: '8 hours ago', user: 'Driver' },
  { id: 7, type: 'stock', action: 'Low Stock Alert', detail: 'Lisinopril 10mg below threshold', time: '12 hours ago', user: 'System' },
  { id: 8, type: 'system', action: 'Login Detected', detail: 'New login from Chrome on Windows', time: '1 day ago', user: 'System' },
];

export const mockAlerts = [
  { id: 1, type: 'EMERGENCY', priority: 'CRITICAL', title: 'EpiPen Available', message: 'Emergency medication now in stock nearby', time: '5 min ago', active: true },
  { id: 2, type: 'STOCK', priority: 'HIGH', title: 'Insulin Low Stock', message: 'Critical levels at MediCare Center', time: '1 hour ago', active: true },
  { id: 3, type: 'DELIVERY', priority: 'MEDIUM', title: 'Delivery Delayed', message: 'SHP-002 delayed by 2 hours', time: '6 hours ago', active: false },
  { id: 4, type: 'RESERVATION', priority: 'HIGH', title: 'Pickup Reminder', message: 'Metformin ready for pickup today', time: '2 hours ago', active: true },
];

export const mockRealtimeStats = {
  activeNotifications: 3,
  pendingReservations: 2,
  activeDeliveries: 1,
  criticalAlerts: 1,
  systemHealth: 98.5,
  lastUpdate: 'Just now',
};
