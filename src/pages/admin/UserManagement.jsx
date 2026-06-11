import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, Ban, Shield, UserCheck,
  X, Eye, Edit, MoreVertical, Calendar, Clock, AlertTriangle,
  CheckCircle, Filter, ChevronLeft,
  ChevronRight, CheckSquare, Square, Trash2,
  RefreshCw, UserPlus, FileSpreadsheet, Activity
} from 'lucide-react';
import { useBanUser, useUnbanUser, useDeleteUser } from '../../hooks';
import { adminService } from '../../api';
import { usePaginatedApi } from '../../hooks/usePaginatedApi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const statusConfig = {
  active: {
    label: 'Active',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  banned: {
    label: 'Suspended',
    dot: 'bg-red-500',
    badge: 'bg-red-50 text-red-700 border-red-200',
    bg: 'bg-red-50',
    text: 'text-red-600',
  },
  inactive: {
    label: 'Inactive',
    dot: 'bg-contrast-muted',
    badge: 'bg-elevated text-contrast-secondary border-elevated',
    bg: 'bg-elevated',
    text: 'text-contrast-secondary',
  },
  pending: {
    label: 'Pending',
    dot: 'bg-orange-400',
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
  },
};

const roleConfig = {
  ADMIN: { label: 'Admin', badge: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-100' },
  PHARMACY: { label: 'Pharmacy', badge: 'bg-brand-50 text-brand-700 border-brand-200 ring-brand-100' },
  DISTRIBUTOR: { label: 'Distributor', badge: 'bg-violet-50 text-violet-700 border-violet-200 ring-violet-100' },
  USER: { label: 'User', badge: 'bg-elevated text-contrast-primary border-elevated ring-slate-100' },
};

const dateFilterOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

const UserManagement = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  const menuRef = useRef(null);

  const {
    data: users,
    loading,
    meta,
    setPage,
    setFilter: setApiFilter,
    refetch,
  } = usePaginatedApi(
    (params) => {
      const apiParams = {};
      if (params.search) apiParams.search = params.search;
      if (params.role && params.role !== 'all') apiParams.role = params.role;
      return adminService.getUsers(apiParams);
    },
    { page: 1 },
    { debounceMs: 400 }
  );

  const { mutate: banUser } = useBanUser({ successMessage: 'User suspended', errorMessage: false });
  const { mutate: unbanUser } = useUnbanUser({ successMessage: 'User activated', errorMessage: false });
  const { mutate: deleteUser } = useDeleteUser({ successMessage: 'User deleted', errorMessage: false });

  const userRows = useMemo(() => (users || []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.is_banned ? 'banned' : 'active',
    joined: u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A',
    lastActivity: u.updated_at
      ? new Date(u.updated_at).toLocaleDateString()
      : u.created_at
        ? new Date(u.created_at).toLocaleDateString()
        : '-',
    raw: u,
  })), [users]);

  const filteredRows = useMemo(() => userRows.filter((row) => {
    if (statusFilter !== 'all' && row.status !== statusFilter) return false;
    if (dateFilter !== 'all') {
      const now = new Date();
      const joined = new Date(row.raw.created_at);
      if (dateFilter === 'today' && joined.toDateString() !== now.toDateString()) return false;
      if (dateFilter === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        if (joined < weekAgo) return false;
      }
      if (dateFilter === 'month') {
        if (joined.getMonth() !== now.getMonth() || joined.getFullYear() !== now.getFullYear()) return false;
      }
      if (dateFilter === 'year') {
        if (joined.getFullYear() !== now.getFullYear()) return false;
      }
    }
    return true;
  }), [userRows, statusFilter, dateFilter]);

  const allSelected = useMemo(() => filteredRows.length > 0 && selectedIds.length === filteredRows.length, [filteredRows, selectedIds]);

  const stats = useMemo(() => [
    { label: 'Total Users', value: meta?.total || users?.length || 0, icon: Users, color: 'text-brand-600', bg: 'bg-brand-50', ring: 'ring-brand-100' },
    { label: 'Active', value: users?.filter(u => u.status === 'active' || !u.is_banned).length || 0, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
    { label: 'Suspended', value: users?.filter(u => u.status === 'banned' || u.is_banned).length || 0, icon: Ban, color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-100' },
    { label: 'Admins', value: users?.filter(u => u.role === 'ADMIN').length || 0, icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-100' },
  ], [meta, users]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setApiFilter('search', value);
  }, [setApiFilter]);

  const handleFilter = useCallback((value) => {
    setFilter(value);
    setApiFilter('role', value === 'all' ? '' : value);
  }, [setApiFilter]);

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.length === filteredRows.length ? [] : filteredRows.map((r) => r.id)
    );
  }, [filteredRows]);

  const handleBulkAction = useCallback(async (action) => {
    setBulkLoading(true);
    try {
      for (const id of selectedIds) {
        if (action === 'ban') await banUser(id);
        if (action === 'unban') await unbanUser(id);
        if (action === 'delete') await deleteUser(id);
      }
      setSelectedIds([]);
      refetch();
    } finally {
      setBulkLoading(false);
    }
  }, [selectedIds, banUser, unbanUser, deleteUser, refetch]);

  const handleExport = useCallback(() => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Registration Date', 'Last Activity'];
    const rows = filteredRows.map((r) => [
      r.name, r.email, r.role, r.status, r.joined, r.lastActivity,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredRows]);

  const handleConfirmAction = useCallback(async () => {
    if (!confirmAction) return;
    const { type, row } = confirmAction;
    try {
      if (type === 'ban') await banUser(row.id);
      if (type === 'unban') await unbanUser(row.id);
      if (type === 'delete') await deleteUser(row.id);
      setConfirmAction(null);
      setSelectedIds([]);
      refetch();
    } catch { /* handled */ }
  }, [confirmAction, banUser, unbanUser, deleteUser, refetch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const confirmConfig = {
    ban: {
      icon: AlertTriangle,
      iconClass: 'text-red-500',
      iconBg: 'bg-red-50',
      title: 'Suspend User',
      message: (name) => `Are you sure you want to suspend ${name}? They will lose access to the platform until reactivated.`,
      confirmText: 'Suspend',
      confirmClass: 'bg-red-500 hover:bg-red-600 text-white',
    },
    unban: {
      icon: CheckCircle,
      iconClass: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      title: 'Activate User',
      message: (name) => `Are you sure you want to activate ${name}? They will regain full access to the platform.`,
      confirmText: 'Activate',
      confirmClass: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    },
    delete: {
      icon: AlertTriangle,
      iconClass: 'text-red-500',
      iconBg: 'bg-red-50',
      title: 'Delete User',
      message: (name) => `Are you sure you want to permanently delete ${name}? This action cannot be undone.`,
      confirmText: 'Delete',
      confirmClass: 'bg-red-500 hover:bg-red-600 text-white',
    },
  };

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">User Management</h1>
            <p className="text-sm text-contrast-secondary mt-1.5">Manage all platform users from one place.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-sm font-medium text-contrast-muted bg-card border border-elevated cursor-not-allowed opacity-60"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-sm font-medium text-brand-600 bg-card border border-brand-200 hover:bg-brand-50 hover:border-brand-300 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-card rounded-[20px] border border-elevated p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-elevated transition-all duration-300 group"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${stat.bg} ring-1 ${stat.ring || 'ring-transparent'} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-contrast-primary tracking-tight">{stat.value}</p>
              <p className="text-xs text-contrast-secondary mt-0.5 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-card rounded-[20px] border border-elevated shadow-sm"
        >
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by name, email, or username..."
                  className="w-full h-11 pl-11 pr-10 rounded-[20px] border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10 transition-all"
                />
                {search && (
                  <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-contrast-muted hover:text-contrast-secondary transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-11 px-4 rounded-[20px] text-sm font-medium border transition-all inline-flex items-center gap-2 ${
                    showFilters
                      ? 'bg-brand-50 text-brand-600 border-brand-200'
                      : 'bg-card text-contrast-secondary border-elevated hover:border-muted hover:text-contrast-primary'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-elevated mt-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-contrast-secondary">Role</label>
                        <div className="flex gap-1.5 flex-wrap">
                          {['all', 'user', 'pharmacy', 'distributor', 'admin'].map((f) => (
                            <button
                              key={f}
                              onClick={() => handleFilter(f)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                filter === f
                                  ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                                  : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                              }`}
                            >
                              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-contrast-secondary">Status</label>
                        <div className="flex gap-1.5 flex-wrap">
                          {[
                            { value: 'all', label: 'All' },
                            { value: 'active', label: 'Active' },
                            { value: 'banned', label: 'Suspended' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setStatusFilter(opt.value)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                statusFilter === opt.value
                                  ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                                  : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-contrast-secondary">Registration</label>
                        <div className="flex gap-1.5 flex-wrap">
                          {dateFilterOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setDateFilter(opt.value)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                dateFilter === opt.value
                                  ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                                  : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-2 px-5 sm:px-6 pb-2">
            {['all', 'user', 'pharmacy', 'distributor', 'admin'].map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  filter === f
                    ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                    : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                }`}
              >
                {f === 'all' ? 'All Roles' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-5 sm:mx-6 mb-4 p-3 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between"
            >
              <span className="text-sm font-medium text-brand-700">
                {selectedIds.length} user{selectedIds.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkAction('unban')}
                  disabled={bulkLoading}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all disabled:opacity-50"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('ban')}
                  disabled={bulkLoading}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all disabled:opacity-50"
                >
                  Suspend
                </button>
                {bulkLoading && (
                  <RefreshCw className="w-4 h-4 text-brand-500 animate-spin" />
                )}
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="px-5 sm:px-6 pb-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-elevated animate-pulse">
                  <div className="w-5 h-5 rounded-lg bg-elevated" />
                  <div className="w-10 h-10 rounded-full bg-elevated" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-elevated rounded-lg w-48" />
                    <div className="h-3.5 bg-elevated rounded-lg w-32" />
                  </div>
                  <div className="h-6 bg-elevated rounded-xl w-16" />
                  <div className="h-6 bg-elevated rounded-xl w-20" />
                  <div className="h-8 bg-elevated rounded-xl w-24" />
                </div>
              ))}
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="px-5 sm:px-6 pb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-14"
              >
                <div className="w-16 h-16 rounded-[20px] bg-elevated border border-elevated flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-contrast-muted" />
                </div>
                <h3 className="text-base font-semibold text-contrast-primary mb-1">No users found</h3>
                <p className="text-sm text-contrast-secondary max-w-sm text-center">
                  {search || statusFilter !== 'all' || dateFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No users are registered on the platform yet.'}
                </p>
                {(search || statusFilter !== 'all' || dateFilter !== 'all' || filter !== 'all') && (
                  <button
                    onClick={() => {
                      handleSearch('');
                      setStatusFilter('all');
                      setDateFilter('all');
                      handleFilter('all');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-medium text-brand-600 bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-all"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            </div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-t border-elevated">
                      <th className="px-5 sm:px-6 py-3.5 text-left">
                        <button onClick={selectAll} className="flex items-center gap-2 text-xs font-semibold text-contrast-muted uppercase tracking-wider">
                          {allSelected ? (
                            <CheckSquare className="w-4 h-4 text-brand-500" />
                          ) : (
                            <Square className="w-4 h-4 text-contrast-muted" />
                          )}
                          User
                        </button>
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Role</th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">
                        <span className="hidden xl:inline">Registration Date</span>
                        <span className="xl:hidden">Registered</span>
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">
                        <span className="hidden xl:inline">Last Activity</span>
                        <span className="xl:hidden">Activity</span>
                      </th>
                      <th className="px-4 py-3.5 text-right text-xs font-semibold text-contrast-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row, i) => {
                      const status = statusConfig[row.status] || statusConfig.active;
                      const role = roleConfig[row.role] || roleConfig.USER;
                      return (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.025 }}
                          className={`group border-t border-elevated hover:bg-elevated/80 transition-colors ${
                            selectedIds.includes(row.id) ? 'bg-brand-50/40' : ''
                          }`}
                        >
                          <td className="px-5 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleSelect(row.id)}
                                className="flex-shrink-0"
                              >
                                {selectedIds.includes(row.id) ? (
                                  <CheckSquare className="w-4 h-4 text-brand-500" />
                                ) : (
                                  <Square className="w-4 h-4 text-contrast-muted group-hover:text-contrast-muted transition-colors" />
                                )}
                              </button>
                              <button
                                onClick={() => setSelectedUser(row)}
                                className="flex items-center gap-3 min-w-0"
                              >
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white shadow-sm">
                                  {row.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-contrast-primary truncate">{row.name}</p>
                                </div>
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm text-contrast-secondary truncate max-w-[180px]">{row.email}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${role.badge}`}>
                              {role.label}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                              <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-contrast-muted flex-shrink-0" />
                              <span className="text-sm text-contrast-secondary whitespace-nowrap">{row.joined}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-contrast-muted flex-shrink-0" />
                              <span className="text-sm text-contrast-secondary whitespace-nowrap">{row.lastActivity}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="relative flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedUser(row)}
                                className="p-2 rounded-xl text-contrast-muted hover:text-brand-600 hover:bg-brand-50 transition-all"
                                title="View Profile"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <div className="relative" ref={openMenuId === row.id ? menuRef : null}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === row.id ? null : row.id);
                                  }}
                                  className="p-2 rounded-xl text-contrast-muted hover:text-contrast-secondary hover:bg-elevated transition-all"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                  {openMenuId === row.id && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute right-0 top-full mt-1 bg-card rounded-2xl shadow-elevated border border-elevated py-1.5 min-w-[170px] z-20 overflow-hidden"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <button
                                        onClick={() => { setSelectedUser(row); setOpenMenuId(null); }}
                                        className="w-full px-4 py-2.5 text-left text-sm text-contrast-secondary hover:bg-elevated hover:text-contrast-primary transition-colors flex items-center gap-2.5"
                                      >
                                        <Eye className="w-4 h-4 text-contrast-muted" />
                                        View Profile
                                      </button>
                                      <button
                                        onClick={() => setOpenMenuId(null)}
                                        className="w-full px-4 py-2.5 text-left text-sm text-contrast-secondary hover:bg-elevated hover:text-contrast-primary transition-colors flex items-center gap-2.5"
                                      >
                                        <Edit className="w-4 h-4 text-contrast-muted" />
                                        Edit
                                      </button>
                                      <div className="border-t border-elevated my-1" />
                                      {row.status === 'active' ? (
                                        <button
                                          onClick={() => { setConfirmAction({ type: 'ban', row }); setOpenMenuId(null); }}
                                          className="w-full px-4 py-2.5 text-left text-sm text-amber-600 hover:bg-amber-50 transition-colors flex items-center gap-2.5"
                                        >
                                          <Ban className="w-4 h-4" />
                                          Suspend
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => { setConfirmAction({ type: 'unban', row }); setOpenMenuId(null); }}
                                          className="w-full px-4 py-2.5 text-left text-sm text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2.5"
                                        >
                                          <CheckCircle className="w-4 h-4" />
                                          Activate
                                        </button>
                                      )}
                                      <button
                                        onClick={() => { setConfirmAction({ type: 'delete', row }); setOpenMenuId(null); }}
                                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                      </button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden divide-y divide-slate-50">
                {filteredRows.map((row, i) => {
                  const status = statusConfig[row.status] || statusConfig.active;
                  const role = roleConfig[row.role] || roleConfig.USER;
                  return (
                    <motion.div
                      key={row.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="px-5 sm:px-6 py-4 hover:bg-elevated/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <button onClick={() => toggleSelect(row.id)} className="mt-1 flex-shrink-0">
                            {selectedIds.includes(row.id) ? (
                              <CheckSquare className="w-4 h-4 text-brand-500" />
                            ) : (
                              <Square className="w-4 h-4 text-contrast-muted" />
                            )}
                          </button>
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0 text-base font-bold text-white shadow-sm">
                            {row.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-semibold text-contrast-primary">{row.name}</h4>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${role.badge}`}>
                                {role.label}
                              </span>
                            </div>
                            <p className="text-xs text-contrast-secondary mt-0.5 truncate">{row.email}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                              </div>
                              <span className="text-xs text-contrast-muted">{row.joined}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => setSelectedUser(row)}
                            className="p-2 rounded-xl text-contrast-muted hover:text-brand-600 hover:bg-brand-50 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative" ref={openMenuId === row.id ? menuRef : null}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === row.id ? null : row.id);
                              }}
                              className="p-2 rounded-xl text-contrast-muted hover:text-contrast-secondary hover:bg-elevated transition-all"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <AnimatePresence>
                              {openMenuId === row.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute right-0 top-full mt-1 bg-card rounded-2xl shadow-elevated border border-elevated py-1.5 min-w-[170px] z-20 overflow-hidden"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    onClick={() => { setSelectedUser(row); setOpenMenuId(null); }}
                                    className="w-full px-4 py-2.5 text-left text-sm text-contrast-secondary hover:bg-elevated transition-colors flex items-center gap-2.5"
                                  >
                                    <Eye className="w-4 h-4 text-contrast-muted" />
                                    View Profile
                                  </button>
                                  <button
                                    onClick={() => setOpenMenuId(null)}
                                    className="w-full px-4 py-2.5 text-left text-sm text-contrast-secondary hover:bg-elevated transition-colors flex items-center gap-2.5"
                                  >
                                    <Edit className="w-4 h-4 text-contrast-muted" />
                                    Edit
                                  </button>
                                  <div className="border-t border-elevated my-1" />
                                  {row.status === 'active' ? (
                                    <button
                                      onClick={() => { setConfirmAction({ type: 'ban', row }); setOpenMenuId(null); }}
                                      className="w-full px-4 py-2.5 text-left text-sm text-amber-600 hover:bg-amber-50 transition-colors flex items-center gap-2.5"
                                    >
                                      <Ban className="w-4 h-4" />
                                      Suspend
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => { setConfirmAction({ type: 'unban', row }); setOpenMenuId(null); }}
                                      className="w-full px-4 py-2.5 text-left text-sm text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2.5"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Activate
                                    </button>
                                  )}
                                  <button
                                    onClick={() => { setConfirmAction({ type: 'delete', row }); setOpenMenuId(null); }}
                                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {meta && meta.lastPage > 1 && (
                <div className="px-5 sm:px-6 py-4 border-t border-elevated flex items-center justify-between">
                  <p className="text-xs text-contrast-muted">
                    Showing <span className="font-medium text-contrast-secondary">{meta.from}</span> to{' '}
                    <span className="font-medium text-contrast-secondary">{meta.to}</span> of{' '}
                    <span className="font-medium text-contrast-secondary">{meta.total}</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPage(Math.max(1, meta.currentPage - 1))}
                      disabled={meta.currentPage <= 1}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-contrast-secondary hover:text-contrast-primary hover:bg-elevated border border-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: meta.lastPage }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === meta.lastPage || Math.abs(p - meta.currentPage) <= 1)
                      .map((p, idx, arr) => {
                        const showGap = idx > 0 && p - arr[idx - 1] > 1;
                        return (
                          <span key={p} className="flex items-center gap-1.5">
                            {showGap && <span className="text-xs text-contrast-muted px-1">...</span>}
                            <button
                              onClick={() => setPage(p)}
                              className={`min-w-[36px] h-9 px-2 rounded-xl text-xs font-medium transition-all ${
                                p === meta.currentPage
                                  ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                                  : 'text-contrast-secondary hover:text-contrast-primary hover:bg-elevated border border-elevated'
                              }`}
                            >
                              {p}
                            </button>
                          </span>
                        );
                      })}
                    <button
                      onClick={() => setPage(Math.min(meta.lastPage, meta.currentPage + 1))}
                      disabled={meta.currentPage >= meta.lastPage}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-contrast-secondary hover:text-contrast-primary hover:bg-elevated border border-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setSelectedUser(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-card shadow-2xl z-50 overflow-y-auto"
            >
              <div className="relative min-h-full">
                <div className="h-32 bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 relative">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="px-6 pb-8">
                  <div className="flex flex-col items-center -mt-14 mb-6">
                    <div className="w-20 h-20 rounded-[20px] bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg border-4 border-white mb-3">
                      {selectedUser.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <h2 className="text-lg font-bold text-contrast-primary text-center">{selectedUser.name}</h2>
                    <p className="text-sm text-contrast-secondary mt-0.5">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${(roleConfig[selectedUser.role] || roleConfig.USER).badge}`}>
                        {(roleConfig[selectedUser.role] || roleConfig.USER).label}
                      </span>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${(statusConfig[selectedUser.status] || statusConfig.active).badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${(statusConfig[selectedUser.status] || statusConfig.active).dot}`} />
                        {(statusConfig[selectedUser.status] || statusConfig.active).label}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Profile Information</h3>
                      <div className="bg-elevated rounded-[20px] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">User ID</span>
                          <span className="text-sm font-medium text-contrast-primary">#{selectedUser.id}</span>
                        </div>
                        <div className="border-t border-elevated" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Full Name</span>
                          <span className="text-sm font-medium text-contrast-primary">{selectedUser.name}</span>
                        </div>
                        <div className="border-t border-elevated" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Role</span>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${(roleConfig[selectedUser.role] || roleConfig.USER).badge}`}>
                            {(roleConfig[selectedUser.role] || roleConfig.USER).label}
                          </span>
                        </div>
                        <div className="border-t border-elevated" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Status</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${(statusConfig[selectedUser.status] || statusConfig.active).dot}`} />
                            <span className={`text-xs font-medium ${(statusConfig[selectedUser.status] || statusConfig.active).text}`}>
                              {(statusConfig[selectedUser.status] || statusConfig.active).label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Contact Information</h3>
                      <div className="bg-elevated rounded-[20px] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Email</span>
                          <span className="text-sm font-medium text-contrast-primary text-right max-w-[200px] truncate">{selectedUser.email}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Account Timeline</h3>
                      <div className="bg-elevated rounded-[20px] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-brand-600" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-contrast-primary">Registered</p>
                              <p className="text-[11px] text-contrast-secondary">{selectedUser.joined}</p>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-elevated" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-elevated flex items-center justify-center">
                              <Activity className="w-4 h-4 text-contrast-secondary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-contrast-primary">Last Activity</p>
                              <p className="text-[11px] text-contrast-secondary">{selectedUser.lastActivity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      {selectedUser.status === 'active' ? (
                        <button
                          onClick={() => {
                            setConfirmAction({ type: 'ban', row: selectedUser });
                            setSelectedUser(null);
                          }}
                          className="flex-1 px-4 py-2.5 rounded-[20px] text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all"
                        >
                          Suspend User
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setConfirmAction({ type: 'unban', row: selectedUser });
                            setSelectedUser(null);
                          }}
                          className="flex-1 px-4 py-2.5 rounded-[20px] text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all"
                        >
                          Activate User
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setConfirmAction({ type: 'delete', row: selectedUser });
                          setSelectedUser(null);
                        }}
                        className="flex-1 px-4 py-2.5 rounded-[20px] text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all"
                      >
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmAction && (() => {
          const action = confirmConfig[confirmAction.type];
          const Icon = action.icon;
          return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setConfirmAction(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative bg-card rounded-[24px] shadow-modal max-w-sm w-full p-6"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-2xl ${action.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${action.iconClass}`} />
                  </div>
                  <h3 className="text-lg font-bold text-contrast-primary">{action.title}</h3>
                  <p className="text-sm text-contrast-secondary mt-2 max-w-xs">
                    {action.message(confirmAction.row.name)}
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setConfirmAction(null)}
                    className="flex-1 px-4 py-2.5 rounded-[20px] text-sm font-medium text-contrast-secondary bg-card border border-elevated hover:bg-elevated transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    className={`flex-1 px-4 py-2.5 rounded-[20px] text-sm font-medium border border-transparent transition-all ${action.confirmClass}`}
                  >
                    {action.confirmText}
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
