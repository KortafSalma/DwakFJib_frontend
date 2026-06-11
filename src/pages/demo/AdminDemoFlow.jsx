import { LayoutDashboard, Users, Building2, Truck, FileText, BarChart3 } from 'lucide-react';
import DemoFlowLayout from '../../components/demo/DemoFlowLayout';

const steps = [
  { num: 1, title: 'Dashboard', desc: 'Platform overview with system-wide metrics: total users, active pharmacies, pending approvals, revenue, and system health.', icon: LayoutDashboard, color: '#14B8A6', path: '/admin' },
  { num: 2, title: 'User Management', desc: 'Manage all platform users: view profiles, assign roles (Patient, Pharmacy, Distributor, Admin), ban/unban accounts, and monitor activity.', icon: Users, color: '#0F766E', path: '/admin/users' },
  { num: 3, title: 'Pharmacy Management', desc: 'Review and verify pharmacy applications. Approve or reject new pharmacies, manage documentation, and monitor compliance.', icon: Building2, color: '#2563EB', path: '/admin/pharmacies' },
  { num: 4, title: 'Distributor Management', desc: 'Process distributor applications. Verify credentials, approve partnerships, and manage distributor network agreements.', icon: Truck, color: '#7C3AED', path: '/admin/distributors' },
  { num: 5, title: 'Reports & Logs', desc: 'Access system activity logs, audit trails, and operational reports. Track all platform changes and user actions.', icon: FileText, color: '#F59E0B', path: '/admin/logs' },
  { num: 6, title: 'Analytics', desc: 'Platform-wide analytics: user growth, pharmacy distribution, reservation trends, revenue charts, and performance KPIs.', icon: BarChart3, color: '#EF4444', path: '/admin/analytics' },
];

const AdminDemoFlow = () => (
  <DemoFlowLayout
    accentColor="#7C3AED"
    title="Admin Demo Flow"
    subtitle="Platform administration — from user management to analytics"
    steps={steps}
    variant="vertical"
  />
);

export default AdminDemoFlow;
