import { LayoutDashboard, BookOpen, ShoppingCart, Truck, BarChart3 } from 'lucide-react';
import DemoFlowLayout from '../../components/demo/DemoFlowLayout';

const steps = [
  { num: 1, title: 'Dashboard', desc: 'Distributor overview with key metrics: active orders, deliveries in transit, revenue, and performance indicators.', icon: LayoutDashboard, color: '#14B8A6', path: '/distributor' },
  { num: 2, title: 'Product Catalog', desc: 'Manage product listings with categories, pricing tiers, stock levels, and bulk pricing for pharmacy customers.', icon: BookOpen, color: '#0F766E', path: '/distributor/orders' },
  { num: 3, title: 'Orders Management', desc: 'View and process incoming orders from pharmacies. Assign delivery personnel, prioritize urgent orders, and track fulfillment.', icon: ShoppingCart, color: '#2563EB', path: '/distributor/orders' },
  { num: 4, title: 'Delivery Tracking', desc: 'Real-time delivery tracking with route optimization. Monitor driver locations, estimated arrival times, and delivery confirmations.', icon: Truck, color: '#7C3AED', path: '/distributor/tracking' },
  { num: 5, title: 'Analytics', desc: 'Revenue analytics with charts: monthly earnings, order volume trends, top-performing products, and delivery performance metrics.', icon: BarChart3, color: '#F59E0B', path: '/distributor/analytics' },
];

const DistributorDemoFlow = () => (
  <DemoFlowLayout
    accentColor="#2563EB"
    title="Distributor Demo Flow"
    subtitle="Distribution network management — from orders to delivery"
    steps={steps}
    showStepGrid
    gridCols={5}
    variant="card"
  />
);

export default DistributorDemoFlow;
