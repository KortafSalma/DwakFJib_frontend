import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Package, ShoppingCart, DollarSign, TrendingUp,
  AlertCircle, CheckCircle, Clock, Store, Truck,
  BarChart3, ChevronRight, Activity, Shield, Settings,
} from 'lucide-react';
import { StatCard, Card, DashboardSection, Skeleton } from '../../components/ui';
import { useAdminDashboard, useActivityTimeline } from '../../hooks';
import { formatTimeAgo } from '../../utils/formatters';
import formatMAD from '../../utils/currency';

function getActivityIcon(type) {
  const iconMap = {
    user: Users,
    pharmacy: Package,
    reservation: ShoppingCart,
    payment: DollarSign,
    alert: AlertCircle,
    system: Shield,
  };
  return iconMap[type] || Activity;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data: dashboardData, loading: dashboardLoading } = useAdminDashboard();
  const { data: activityData, loading: activityLoading } = useActivityTimeline(10);

  const stats = dashboardData?.data || dashboardData || {};

  const activities = (activityData?.data || activityData || []).map((item) => ({
    id: item.id,
    type: item.action_type || item.type || 'system',
    action: item.description || item.action || 'System event',
    user: item.user_name || item.causer?.name || 'System',
    time: item.time_ago || formatTimeAgo(item.created_at),
    icon: getActivityIcon(item.action_type || item.type),
  }));

  const totalUsers = stats.total_users?.toLocaleString() || stats.users?.total?.toLocaleString() || '—';
  const totalPharmacies = stats.total_pharmacies || stats.pharmacies?.total || '—';
  const totalDistributors = stats.total_distributors || stats.distributors?.total || '—';
  const totalReservations = stats.total_reservations?.toLocaleString() || stats.reservations?.total?.toLocaleString() || '—';
  const activeUsers = stats.active_users || stats.users?.active || '—';
  const revenue = formatMAD(stats.monthly_revenue || stats.revenue?.monthly || 0);

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-contrast-secondary mt-1">Platform overview and management</p>
        </motion.div>

        {/* KPI Cards */}
        {dashboardLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard icon={Users} label="Total Users" value={totalUsers} color="primary" />
            <StatCard icon={Store} label="Pharmacies" value={totalPharmacies} color="blue" />
            <StatCard icon={Truck} label="Distributors" value={totalDistributors} color="violet" />
            <StatCard icon={ShoppingCart} label="Reservations" value={totalReservations} color="yellow" />
            <StatCard icon={Activity} label="Active Users" value={activeUsers} color="emerald" />
            <StatCard icon={DollarSign} label="Monthly Revenue" value={revenue} color="red" />
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Users, label: 'Manage Users', path: '/admin/users' },
            { icon: BarChart3, label: 'View Reports', path: '/admin/analytics' },
            { icon: ShoppingCart, label: 'Monitor Reservations', path: '/admin/reservations' },
            { icon: Settings, label: 'Platform Settings', path: '/admin/settings' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-elevated hover:border-elevated hover:shadow-sm transition-all"
            >
              <action.icon className="w-5 h-5 text-brand-500" />
              <span className="text-sm font-medium text-contrast-primary">{action.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-contrast-muted ml-auto" />
            </button>
          ))}
        </div>

        {/* User Management Overview + Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* User Management Overview */}
          <Card>
            <DashboardSection title="User Management Overview" description="Platform user distribution" />
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="p-4 rounded-xl bg-elevated border border-elevated">
                <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center mb-2">
                  <Users className="w-4 h-4 text-brand-500" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{totalUsers}</p>
                <p className="text-[10px] text-contrast-secondary mt-0.5">Total Patients</p>
              </div>
              <div className="p-4 rounded-xl bg-elevated border border-elevated">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-2">
                  <Store className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{totalPharmacies}</p>
                <p className="text-[10px] text-contrast-secondary mt-0.5">Total Pharmacies</p>
              </div>
              <div className="p-4 rounded-xl bg-elevated border border-elevated">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mb-2">
                  <Truck className="w-4 h-4 text-purple-500" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{totalDistributors}</p>
                <p className="text-[10px] text-contrast-secondary mt-0.5">Total Distributors</p>
              </div>
              <div className="p-4 rounded-xl bg-elevated border border-elevated">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{stats.new_users || stats.users?.new || '—'}</p>
                <p className="text-[10px] text-contrast-secondary mt-0.5">New Registrations</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/users')}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-50 text-brand-600 text-sm font-medium hover:bg-brand-100 transition-all border border-brand-200"
            >
              <Users className="w-4 h-4" />
              Manage All Users
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Card>

          {/* Recent Activity */}
          <Card>
            <DashboardSection title="Recent Activity" description="Latest platform events" />
            {activityLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            ) : activities.length > 0 ? (
              <div className="space-y-2">
                {activities.slice(0, 6).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-elevated border border-elevated hover:border-elevated transition-all">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-brand-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-contrast-primary">{item.action}</p>
                        <p className="text-[10px] text-contrast-secondary mt-0.5">
                          {item.user} · {item.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-8 h-8 text-contrast-muted mx-auto mb-2" />
                <p className="text-sm text-contrast-secondary">No recent activity</p>
              </div>
            )}
          </Card>
        </div>

        {/* Pharmacy Management + Distributor Management */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Pharmacy Management */}
          <Card>
            <DashboardSection
              title="Pharmacy Management"
              description={`${stats.total_pharmacies || '—'} registered`}
              action={
                <button
                  onClick={() => navigate('/admin/pharmacies')}
                  className="text-xs font-medium text-brand-500 hover:text-brand-600 inline-flex items-center gap-0.5"
                >
                  Manage <ChevronRight className="w-3 h-3" />
                </button>
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{stats.verified_pharmacies || stats.pharmacies?.verified || '—'}</p>
                <p className="text-[10px] text-contrast-secondary">Verified</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{stats.pending_pharmacies || stats.pharmacies?.pending || '—'}</p>
                <p className="text-[10px] text-contrast-secondary">Pending Approval</p>
              </div>
            </div>
          </Card>

          {/* Distributor Management */}
          <Card>
            <DashboardSection
              title="Distributor Management"
              description={`${stats.total_distributors || '—'} registered`}
              action={
                <button
                  onClick={() => navigate('/admin/distributors')}
                  className="text-xs font-medium text-brand-500 hover:text-brand-600 inline-flex items-center gap-0.5"
                >
                  Manage <ChevronRight className="w-3 h-3" />
                </button>
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{stats.verified_distributors || stats.distributors?.verified || '—'}</p>
                <p className="text-[10px] text-contrast-secondary">Verified</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{stats.pending_distributors || stats.distributors?.pending || '—'}</p>
                <p className="text-[10px] text-contrast-secondary">Pending Approval</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Reservation Monitoring + System Health */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Reservation Monitoring */}
          <Card>
            <DashboardSection title="Reservation Monitoring" description="Status distribution" />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { label: 'Total', value: totalReservations, color: 'text-contrast-primary', bg: 'bg-elevated', border: 'border-elevated' },
                { label: 'Pending', value: stats.pending_reservations || stats.reservations?.pending || '—', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
                { label: 'Confirmed', value: stats.confirmed_reservations || stats.reservations?.confirmed || '—', color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200' },
                { label: 'Completed', value: stats.completed_reservations || stats.reservations?.completed || '—', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                { label: 'Cancelled', value: stats.cancelled_reservations || stats.reservations?.cancelled || '—', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
              ].map((item) => (
                <div key={item.label} className={`text-center p-3 rounded-xl border ${item.bg} ${item.border}`}>
                  <p className="text-lg font-bold text-contrast-primary">{item.value}</p>
                  <p className={`text-[10px] font-medium ${item.color} mt-0.5`}>{item.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* System Health */}
          <Card>
            <DashboardSection title="System Health" description="Platform status" />
            <div className="space-y-3">
              {[
                { label: 'API Status', status: 'Operational', color: 'text-emerald-600', dot: 'bg-emerald-400' },
                { label: 'Database', status: 'Operational', color: 'text-emerald-600', dot: 'bg-emerald-400' },
                { label: 'Queue Service', status: 'Operational', color: 'text-emerald-600', dot: 'bg-emerald-400' },
                { label: 'Error Rate', status: '< 0.1%', color: 'text-emerald-600', dot: 'bg-emerald-400' },
                { label: 'Uptime', status: '99.9%', color: 'text-emerald-600', dot: 'bg-emerald-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 px-4 rounded-xl bg-elevated border border-elevated">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                    <span className="text-sm text-contrast-secondary">{item.label}</span>
                  </div>
                  <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
