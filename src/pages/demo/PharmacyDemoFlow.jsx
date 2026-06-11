import { LayoutDashboard, Package, CalendarCheck, BarChart3, ShoppingCart } from 'lucide-react';
import DemoFlowLayout from '../../components/demo/DemoFlowLayout';

const steps = [
  { num: 1, title: 'Dashboard', desc: 'Pharmacy overview with key metrics: total inventory, pending reservations, revenue today, low stock alerts, and recent orders.', icon: LayoutDashboard, color: '#14B8A6', path: '/pharmacy' },
  { num: 2, title: 'Inventory Management', desc: 'View and manage medication stock. Add new medications, update quantities, set price points, and monitor expiry dates.', icon: Package, color: '#0F766E', path: '/pharmacy/inventory' },
  { num: 3, title: 'Reservation Management', desc: 'Process patient reservations: confirm availability, prepare orders, mark as ready for pickup, and track completion.', icon: CalendarCheck, color: '#2563EB', path: '/pharmacy/reservations' },
  { num: 4, title: 'Sales Analytics', desc: 'Visualize sales data with charts: revenue trends, top-selling medications, peak hours, and monthly comparisons.', icon: BarChart3, color: '#7C3AED', path: '/pharmacy/analytics' },
  { num: 5, title: 'Distributor Orders', desc: 'Place orders to distributors for restocking. Track order status, delivery timelines, and manage supplier relationships.', icon: ShoppingCart, color: '#F59E0B', path: '/pharmacy/orders' },
];

const PharmacyDemoFlow = () => (
  <DemoFlowLayout
    accentColor="#0F766E"
    title="Pharmacy Demo Flow"
    subtitle="Pharmacy operations dashboard — from inventory to analytics"
    steps={steps}
    showStepGrid
    gridCols={5}
    variant="card"
  />
);

export default PharmacyDemoFlow;
