import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Store, Clock, TrendingUp } from 'lucide-react';
import { mockOrders } from '../../mock/distributorData';
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
};

const priorityColors = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-amber-600 bg-amber-50 border-amber-200',
  low: 'text-contrast-secondary bg-elevated border-elevated',
};

const OrdersQueue = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = mockOrders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = o.pharmacy.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
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

  const pendingQueue = mockOrders.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING');

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Orders Queue</h1>
          <p className="text-sm text-contrast-secondary mt-1">Manage incoming pharmacy orders</p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Package, label: 'Total Orders', value: statusCounts.all, color: 'text-contrast-primary', bg: 'bg-elevated' },
            { icon: Clock, label: 'Pending', value: statusCounts.PENDING, color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: TrendingUp, label: 'Processing', value: statusCounts.PROCESSING, color: 'text-brand-600', bg: 'bg-brand-50' },
            { icon: Package, label: 'Total Value', value: formatMAD(mockOrders.reduce((sum, o) => sum + o.total, 0)), color: 'text-brand-600', bg: 'bg-brand-50' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-contrast-primary">{stat.value}</p>
              <p className="text-xs text-contrast-secondary mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders by pharmacy or ID..."
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
                    : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                }`}
              >
                {key === 'all' ? 'All' : key}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  statusFilter === key ? 'bg-brand-100' : 'bg-elevated'
                }`}>{count}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-semibold text-contrast-primary">Order List</h2>
                  <p className="text-xs text-contrast-secondary mt-0.5">{filtered.length} orders</p>
                </div>
              </div>
              <div className="space-y-2">
                {filtered.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-elevated border border-elevated hover:border-elevated transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-brand-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-contrast-primary">{order.id}</h4>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityColors[order.priority]}`}>
                            {order.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-contrast-secondary mt-0.5">
                          <Store className="w-3 h-3 inline mr-1" />
                          {order.pharmacy} · {order.items} items
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                      <p className="text-xs font-semibold text-contrast-primary mt-1">{formatMAD(order.total)}</p>
                      <p className="text-[10px] text-contrast-muted">{order.date}</p>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-10 h-10 text-contrast-muted mx-auto mb-3" />
                    <p className="text-sm text-contrast-secondary">No orders found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all">
              <h2 className="text-base font-semibold text-contrast-primary mb-1">Pending Queue</h2>
              <p className="text-xs text-contrast-secondary mb-5">{pendingQueue.length} require action</p>
              <div className="space-y-3">
                {pendingQueue.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-elevated hover:border-elevated transition-all"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${order.priority === 'high' ? 'bg-red-400' : order.priority === 'medium' ? 'bg-amber-400' : 'bg-contrast-muted'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-contrast-primary">{order.id}</p>
                      <p className="text-[10px] text-contrast-secondary truncate">{order.pharmacy}</p>
                      <p className="text-[10px] text-contrast-muted">{formatMAD(order.total)} · {order.items} items</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </motion.div>
                ))}
                {pendingQueue.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-xs text-contrast-secondary">All caught up!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersQueue;
