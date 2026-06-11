import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Truck, Package, TrendingUp, XCircle } from 'lucide-react';
import { mockOrders } from '../../mock/pharmacyData';
import formatMAD from '../../utils/currency';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const statusColors = {
  PENDING: 'text-amber-600 bg-amber-50 border-amber-200',
  PROCESSING: 'text-brand-600 bg-brand-50 border-brand-200',
  SHIPPED: 'text-blue-600 bg-blue-50 border-blue-200',
  DELIVERED: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  CANCELLED: 'text-red-600 bg-red-50 border-red-200',
  all: 'text-contrast-secondary bg-elevated border-elevated',
};

const OrdersManagement = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = mockOrders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = o.supplier.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: mockOrders.length,
    PENDING: mockOrders.filter((o) => o.status === 'PENDING').length,
    PROCESSING: mockOrders.filter((o) => o.status === 'PROCESSING').length,
    SHIPPED: mockOrders.filter((o) => o.status === 'SHIPPED').length,
    DELIVERED: mockOrders.filter((o) => o.status === 'DELIVERED').length,
    CANCELLED: mockOrders.filter((o) => o.status === 'CANCELLED').length,
  };

  const totalValue = filtered.reduce((sum, o) => sum + o.total, 0);
  const pendingValue = mockOrders.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING').length;

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Orders Management</h1>
            <p className="text-sm text-contrast-muted mt-1">Track supplier orders and deliveries</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 transition-all">
            <Plus className="w-4 h-4" />
            New Order
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Package, label: 'Total Orders', value: statusCounts.all, color: 'text-contrast-primary', bg: 'bg-elevated' },
            { icon: TrendingUp, label: 'Pending', value: pendingValue, color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: Truck, label: 'In Transit', value: statusCounts.SHIPPED + statusCounts.PROCESSING, color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Package, label: 'Total Value', value: formatMAD(totalValue), color: 'text-brand-600', bg: 'bg-brand-50' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-contrast-primary">{stat.value}</p>
              <p className="text-xs text-contrast-muted mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full h-11 pl-11 pr-4 rounded-2xl border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(statusCounts).map(([key, count]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  statusFilter === key
                    ? 'bg-brand-50 text-brand-600 border border-brand-200'
                    : 'bg-card text-contrast-muted border border-elevated hover:border-muted hover:text-contrast-primary'
                }`}
              >
                {key === 'all' ? 'All' : key} <span className="font-semibold">({count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Order List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-contrast-primary">Order List</h2>
              <p className="text-xs text-contrast-muted mt-0.5">{filtered.length} orders</p>
            </div>
          </div>
          <div className="space-y-2">
            {filtered.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-xl bg-elevated border border-elevated hover:border-elevated transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-brand-600">
                      {order.id.split('-')[1]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-contrast-primary">{order.id}</h4>
                    <p className="text-[11px] text-contrast-secondary">{order.supplier} · {order.items} items</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <p className="text-xs font-semibold text-contrast-primary mt-1">${order.total.toLocaleString()}</p>
                  <p className="text-[10px] text-contrast-muted">{order.date}</p>
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <XCircle className="w-10 h-10 text-contrast-muted mx-auto mb-3" />
                <p className="text-sm text-contrast-secondary">No orders found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrdersManagement;
