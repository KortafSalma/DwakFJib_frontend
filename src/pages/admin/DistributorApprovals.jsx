import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, Search, X, Eye, MapPin, Clock,
  Star, Calendar,
  ChevronLeft, ChevronRight, MoreVertical, Trash2,
  AlertTriangle, CheckCircle, Activity,
  Filter, Download, Plus, Building2, Globe,
  BarChart3, Verified, X as XIcon
} from 'lucide-react';
import { useDeleteDistributor, useUpdateDistributor } from '../../hooks';
import { distributorService } from '../../api';
import { usePaginatedApi } from '../../hooks/usePaginatedApi';
import { mockPending, mockApproved } from '../../mock/distributorApprovals';
import { formatTimeAgo, formatDate } from '../../utils/formatters';

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
    label: 'Active', dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    text: 'text-emerald-600',
  },
  inactive: {
    label: 'Inactive', dot: 'bg-contrast-muted',
    badge: 'bg-elevated text-contrast-secondary border-elevated',
    text: 'text-contrast-secondary',
  },
  pending: {
    label: 'Pending', dot: 'bg-orange-400',
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    text: 'text-orange-600',
  },
  suspended: {
    label: 'Suspended', dot: 'bg-red-500',
    badge: 'bg-red-50 text-red-700 border-red-200',
    text: 'text-red-600',
  },
  verified: {
    label: 'Verified', dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    text: 'text-emerald-600',
  },
};

const tabOptions = [
  { value: 'all', label: 'All Distributors', filterValue: undefined },
  { value: 'pending', label: 'Pending', filterValue: 'false' },
  { value: 'verified', label: 'Verified', filterValue: 'true' },
];

function getRegions(distributors) {
  const regionSet = new Set();
  distributors.forEach((d) => {
    if (d.city) regionSet.add(d.city);
  });
  return Array.from(regionSet).sort();
}

const DistributorApprovals = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef(null);

  const {
    data: apiDistributors,
    loading,
    meta,
    setPage,
    setFilter: setApiFilter,
  } = usePaginatedApi(
    (params) => {
      const apiParams = {};
      if (params.search) apiParams.search = params.search;
      if (params.verified !== undefined) apiParams.verified = params.verified;
      return distributorService.getDistributors(apiParams);
    },
    { page: 1 },
    { debounceMs: 400 }
  );

  const { mutate: deleteDistributor } = useDeleteDistributor({
    successMessage: 'Distributor removed',
    errorMessage: 'Failed to remove distributor',
  });

  const { mutate: updateDistributor } = useUpdateDistributor({
    successMessage: 'Distributor updated',
    errorMessage: 'Failed to update distributor',
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setApiFilter('search', value);
  }, [setApiFilter]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    const opt = tabOptions.find((o) => o.value === tab);
    setApiFilter('verified', opt?.filterValue ?? '');
  }, [setApiFilter]);

  const handleDelete = useCallback((id) => {
    deleteDistributor(id);
    setConfirmAction(null);
    setSelectedDistributor(null);
  }, [deleteDistributor]);

  const handleVerify = useCallback((id) => {
    updateDistributor(id, { is_verified: true });
    setConfirmAction(null);
    setSelectedDistributor(null);
  }, [updateDistributor]);

  const buildDistributors = useCallback((apiData, fallbackPending, fallbackApproved) => {
    if (apiData && apiData.length > 0) {
      return apiData.map((d) => ({
        id: d.id,
        name: d.name || 'Unknown',
        company: d.company_name || d.company || '',
        address: d.address || 'N/A',
        city: d.city || d.region || 'N/A',
        owner: d.user?.name || d.contact_person || d.owner || 'Unknown',
        email: d.user?.email || d.email || '',
        phone: d.phone || '',
        createdDate: d.created_at ? formatDate(d.created_at) : 'N/A',
        submitted: d.created_at ? formatTimeAgo(d.created_at) : 'Recently',
        isVerified: d.is_verified ?? false,
        productsCount: d.products_count ?? d.productsCount ?? 0,
        ordersCount: d.orders_count ?? d.ordersCount ?? 0,
        rating: d.rating ?? 0,
        raw: d,
      }));
    }
    const pending = fallbackPending.map((d) => ({
      id: d.id, name: d.name, company: '', address: d.address, city: d.city,
      owner: d.owner, email: '', phone: '',
      createdDate: formatDate(new Date().toISOString()), submitted: d.submitted,
      isVerified: false, productsCount: 0, ordersCount: 0, rating: 0, raw: d,
    }));
    const approved = fallbackApproved.map((d) => ({
      id: d.id, name: d.name, company: '', address: '', city: d.city,
      owner: '', email: '', phone: '',
      createdDate: formatDate(new Date().toISOString()),
      submitted: d.verified ? `Verified ${d.verified}` : 'Verified',
      isVerified: true, productsCount: 0, ordersCount: d.orders || 0,
      rating: d.rating || 0, raw: d,
    }));
    return [...pending, ...approved];
  }, []);

  const distributors = useMemo(
    () => buildDistributors(apiDistributors, mockPending, mockApproved),
    [apiDistributors, buildDistributors]
  );

  const distributorsDisplayed = useMemo(() => {
    let filtered = distributors;
    if (activeTab === 'pending') filtered = filtered.filter((d) => !d.isVerified);
    else if (activeTab === 'verified') filtered = filtered.filter((d) => d.isVerified);
    if (regionFilter !== 'all') filtered = filtered.filter((d) => d.city === regionFilter);
    return filtered;
  }, [distributors, activeTab, regionFilter]);

  const handleExport = useCallback(() => {
    const headers = ['Distributor Name', 'Company', 'Email', 'City', 'Status', 'Verified', 'Registration Date'];
    const rows = distributorsDisplayed.map((d) => [
      d.name, d.company || '', d.email || '', d.city,
      d.isVerified ? 'Active' : 'Pending',
      d.isVerified ? 'Yes' : 'No',
      d.createdDate,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `distributors-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [distributorsDisplayed]);

  const regions = useMemo(() => getRegions(distributors), [distributors]);

  const stats = useMemo(() => [
    {
      label: 'Total Distributors', value: distributors.length,
      icon: Truck, color: 'text-brand-600', bg: 'bg-brand-50', ring: 'ring-brand-100',
    },
    {
      label: 'Verified', value: distributors.filter((d) => d.isVerified).length,
      icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100',
    },
    {
      label: 'Pending Review', value: distributors.filter((d) => !d.isVerified).length,
      icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', ring: 'ring-orange-100',
    },
    {
      label: 'Regions', value: regions.length,
      icon: Globe, color: 'text-violet-600', bg: 'bg-violet-50', ring: 'ring-violet-100',
    },
  ], [distributors, regions]);

  const confirmConfig = {
    verify: {
      icon: CheckCircle, iconClass: 'text-emerald-500', iconBg: 'bg-emerald-50',
      title: 'Verify Distributor',
      message: (name) => `Are you sure you want to verify ${name}? They will be granted full access to the platform.`,
      confirmText: 'Verify',
      confirmClass: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      action: (id) => handleVerify(id),
    },
    reject: {
      icon: AlertTriangle, iconClass: 'text-red-500', iconBg: 'bg-red-50',
      title: 'Remove Distributor',
      message: (name) => `Are you sure you want to remove ${name}? This action cannot be undone.`,
      confirmText: 'Remove',
      confirmClass: 'bg-red-500 hover:bg-red-600 text-white',
      action: (id) => handleDelete(id),
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
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Distributor Management</h1>
            <p className="text-sm text-contrast-secondary mt-1.5">Manage and monitor all pharmaceutical distributors.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-sm font-medium text-contrast-muted bg-card border border-elevated cursor-not-allowed opacity-60"
            >
              <Plus className="w-4 h-4" />
              <span>Add Distributor</span>
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-sm font-medium text-brand-600 bg-card border border-brand-200 hover:bg-brand-50 hover:border-brand-300 transition-all"
            >
              <Download className="w-4 h-4" />
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
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${stat.bg} ring-1 ${stat.ring} mb-3 group-hover:scale-105 transition-transform duration-300`}>
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
          <div className="p-5 sm:p-6 pb-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by distributor name, company, or city..."
                  className="w-full h-11 pl-11 pr-10 rounded-[20px] border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10 transition-all"
                />
                {search && (
                  <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-contrast-muted hover:text-contrast-secondary transition-colors">
                    <XIcon className="w-4 h-4" />
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
                        <label className="text-xs font-medium text-contrast-secondary">Status</label>
                        <div className="flex gap-1.5 flex-wrap">
                          {tabOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => handleTabChange(opt.value)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                activeTab === opt.value
                                  ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                                  : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {regions.length > 0 && (
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-medium text-contrast-secondary">Region</label>
                          <div className="flex gap-1.5 flex-wrap max-w-sm">
                            <button
                              onClick={() => setRegionFilter('all')}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                regionFilter === 'all'
                                  ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                                  : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                              }`}
                            >
                              All Regions
                            </button>
                            {regions.slice(0, 10).map((region) => (
                              <button
                                key={region}
                                onClick={() => setRegionFilter(region)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                  regionFilter === region
                                    ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                                    : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                                }`}
                              >
                                {region}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-2 px-5 sm:px-6 pb-4 pt-2">
            {tabOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleTabChange(opt.value)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === opt.value
                    ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                    : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                }`}
              >
                {opt.label}
                {opt.value === 'pending' && distributors.filter((d) => !d.isVerified).length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-orange-100 text-orange-600 rounded-full">
                    {distributors.filter((d) => !d.isVerified).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="px-5 sm:px-6 pb-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-elevated animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-elevated" />
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
          ) : distributorsDisplayed.length === 0 ? (
            <div className="px-5 sm:px-6 pb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-14"
              >
                <div className="w-16 h-16 rounded-[20px] bg-elevated border border-elevated flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-contrast-muted" />
                </div>
                <h3 className="text-base font-semibold text-contrast-primary mb-1">No distributors found</h3>
                <p className="text-sm text-contrast-secondary max-w-sm text-center">
                  {search || activeTab !== 'pending' || regionFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No distributor registrations to review.'}
                </p>
                {(search || activeTab !== 'pending' || regionFilter !== 'all') && (
                  <button
                    onClick={() => {
                      handleSearch('');
                      handleTabChange('pending');
                      setRegionFilter('all');
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
                      <th className="px-5 sm:px-6 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Distributor</th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Company</th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Region</th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">
                        <span className="hidden xl:inline">Verification</span>
                        <span className="xl:hidden">Verif.</span>
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">
                        <span className="hidden xl:inline">Orders</span>
                        <span className="xl:hidden">Ord.</span>
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-contrast-muted uppercase tracking-wider">Registered</th>
                      <th className="px-4 py-3.5 text-right text-xs font-semibold text-contrast-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distributorsDisplayed.map((dist, i) => {
                      const status = dist.isVerified ? statusConfig.verified : statusConfig.pending;
                      return (
                        <motion.tr
                          key={dist.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.025 }}
                          className="group border-t border-elevated hover:bg-elevated/80 transition-colors"
                        >
                          <td className="px-5 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setSelectedDistributor(dist)}
                                className="flex items-center gap-3 min-w-0"
                              >
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white shadow-sm">
                                  {dist.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-contrast-primary truncate">{dist.name}</p>
                                </div>
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-contrast-secondary">{dist.company || '—'}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-contrast-muted flex-shrink-0" />
                              <span className="text-sm text-contrast-secondary truncate max-w-[120px]">{dist.city}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                              <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {dist.isVerified ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border bg-sky-50 text-sky-700 border-sky-200">
                                <Verified className="w-3 h-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border bg-orange-50 text-orange-700 border-orange-200">
                                <Clock className="w-3 h-3" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm font-medium text-contrast-primary">{dist.ordersCount}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-contrast-muted flex-shrink-0" />
                              <span className="text-sm text-contrast-secondary whitespace-nowrap">{dist.createdDate}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="relative flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedDistributor(dist)}
                                className="p-2 rounded-xl text-contrast-muted hover:text-brand-600 hover:bg-brand-50 transition-all"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <div className="relative" ref={openMenuId === dist.id ? menuRef : null}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === dist.id ? null : dist.id);
                                  }}
                                  className="p-2 rounded-xl text-contrast-muted hover:text-contrast-secondary hover:bg-elevated transition-all"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                  {openMenuId === dist.id && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute right-0 top-full mt-1 bg-card rounded-2xl shadow-elevated border border-elevated py-1.5 min-w-[180px] z-20 overflow-hidden"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <button
                                        onClick={() => { setSelectedDistributor(dist); setOpenMenuId(null); }}
                                        className="w-full px-4 py-2.5 text-left text-sm text-contrast-secondary hover:bg-elevated transition-colors flex items-center gap-2.5"
                                      >
                                        <Eye className="w-4 h-4 text-contrast-muted" />
                                        View Details
                                      </button>
                                      <div className="border-t border-elevated my-1" />
                                      {!dist.isVerified ? (
                                        <button
                                          onClick={() => { setConfirmAction({ type: 'verify', row: dist }); setOpenMenuId(null); }}
                                          className="w-full px-4 py-2.5 text-left text-sm text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2.5"
                                        >
                                          <CheckCircle className="w-4 h-4" />
                                          Verify Distributor
                                        </button>
                                      ) : null}
                                      <button
                                        onClick={() => { setConfirmAction({ type: 'reject', row: dist }); setOpenMenuId(null); }}
                                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                        {dist.isVerified ? 'Remove' : 'Reject'}
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
                {distributorsDisplayed.map((dist, i) => {
                  const status = dist.isVerified ? statusConfig.verified : statusConfig.pending;
                  return (
                    <motion.div
                      key={dist.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="px-5 sm:px-6 py-4 hover:bg-elevated/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center flex-shrink-0 text-base font-bold text-white shadow-sm">
                            {dist.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-semibold text-contrast-primary">{dist.name}</h4>
                              {dist.isVerified ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border bg-sky-50 text-sky-700 border-sky-200">
                                  <Verified className="w-3 h-3" />
                                  Verified
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border bg-orange-50 text-orange-700 border-orange-200">
                                  <Clock className="w-3 h-3" />
                                  Pending
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-contrast-secondary mt-0.5">
                              {dist.company && <span>{dist.company} · </span>}
                              {dist.owner}
                            </div>
                            <div className="flex items-center gap-3 mt-1.5">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-contrast-muted">
                                <MapPin className="w-3 h-3" />
                                {dist.city}
                              </div>
                              <span className="text-xs text-contrast-muted">{dist.createdDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => setSelectedDistributor(dist)}
                            className="p-2 rounded-xl text-contrast-muted hover:text-brand-600 hover:bg-brand-50 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative" ref={openMenuId === dist.id ? menuRef : null}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === dist.id ? null : dist.id);
                              }}
                              className="p-2 rounded-xl text-contrast-muted hover:text-contrast-secondary hover:bg-elevated transition-all"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <AnimatePresence>
                              {openMenuId === dist.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute right-0 top-full mt-1 bg-card rounded-2xl shadow-elevated border border-elevated py-1.5 min-w-[180px] z-20 overflow-hidden"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    onClick={() => { setSelectedDistributor(dist); setOpenMenuId(null); }}
                                    className="w-full px-4 py-2.5 text-left text-sm text-contrast-secondary hover:bg-elevated transition-colors flex items-center gap-2.5"
                                  >
                                    <Eye className="w-4 h-4 text-contrast-muted" />
                                    View Details
                                  </button>
                                  <div className="border-t border-elevated my-1" />
                                  {!dist.isVerified ? (
                                    <button
                                      onClick={() => { setConfirmAction({ type: 'verify', row: dist }); setOpenMenuId(null); }}
                                      className="w-full px-4 py-2.5 text-left text-sm text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2.5"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Verify Distributor
                                    </button>
                                  ) : null}
                                  <button
                                    onClick={() => { setConfirmAction({ type: 'reject', row: dist }); setOpenMenuId(null); }}
                                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    {dist.isVerified ? 'Remove' : 'Reject'}
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                      {!dist.isVerified && (
                        <div className="flex items-center gap-2 mt-3 ml-[52px]">
                          <button
                            onClick={() => { setConfirmAction({ type: 'verify', row: dist }); }}
                            className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => { setConfirmAction({ type: 'reject', row: dist }); }}
                            className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-1.5"
                          >
                            <X className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      )}
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
        {selectedDistributor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setSelectedDistributor(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-card shadow-2xl z-50 overflow-y-auto"
            >
              <div className="relative min-h-full">
                <div className="h-36 bg-gradient-to-br from-violet-500 via-violet-400 to-brand-500 relative">
                  <button
                    onClick={() => setSelectedDistributor(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="px-6 pb-8">
                  <div className="flex flex-col items-center -mt-16 mb-6">
                    <div className="w-24 h-24 rounded-[24px] bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white mb-3">
                      {selectedDistributor.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <h2 className="text-xl font-bold text-contrast-primary text-center">{selectedDistributor.name}</h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-contrast-muted" />
                      <span className="text-sm text-contrast-secondary">
                        {selectedDistributor.company || selectedDistributor.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {selectedDistributor.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold border bg-sky-50 text-sky-700 border-sky-200">
                          <Verified className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold border bg-orange-50 text-orange-700 border-orange-200">
                          <Clock className="w-3.5 h-3.5" />
                          Pending Verification
                        </span>
                      )}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${selectedDistributor.isVerified ? statusConfig.active.badge : statusConfig.pending.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${selectedDistributor.isVerified ? statusConfig.active.dot : statusConfig.pending.dot}`} />
                        {selectedDistributor.isVerified ? 'Active' : 'Pending'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Distributor Information</h3>
                      <div className="bg-elevated rounded-[20px] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Distributor ID</span>
                          <span className="text-sm font-medium text-contrast-primary">#{selectedDistributor.id}</span>
                        </div>
                        <div className="border-t border-elevated" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Name</span>
                          <span className="text-sm font-medium text-contrast-primary text-right max-w-[200px] truncate">{selectedDistributor.name}</span>
                        </div>
                        <div className="border-t border-elevated" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Owner / Contact</span>
                          <span className="text-sm font-medium text-contrast-primary">{selectedDistributor.owner}</span>
                        </div>
                        {selectedDistributor.company && (
                          <>
                            <div className="border-t border-elevated" />
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-contrast-secondary">Company</span>
                              <span className="text-sm font-medium text-contrast-primary">{selectedDistributor.company}</span>
                            </div>
                          </>
                        )}
                        {selectedDistributor.rating > 0 && (
                          <>
                            <div className="border-t border-elevated" />
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-contrast-secondary">Rating</span>
                              <span className="flex items-center gap-1 text-sm font-medium text-contrast-primary">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                {selectedDistributor.rating}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {(selectedDistributor.email || selectedDistributor.phone) && (
                      <div>
                        <h3 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Contact Details</h3>
                        <div className="bg-elevated rounded-[20px] p-4 space-y-3">
                          {selectedDistributor.email && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-contrast-secondary">Email</span>
                              <span className="text-sm font-medium text-contrast-primary text-right max-w-[250px] truncate">{selectedDistributor.email}</span>
                            </div>
                          )}
                          {selectedDistributor.email && selectedDistributor.phone && <div className="border-t border-elevated" />}
                          {selectedDistributor.phone && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-contrast-secondary">Phone</span>
                              <span className="text-sm font-medium text-contrast-primary">{selectedDistributor.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-xs font-semibold text-contrast-muted uppercase tracking-wider mb-3">Location</h3>
                      <div className="bg-elevated rounded-[20px] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">Address</span>
                          <span className="text-sm font-medium text-contrast-primary text-right max-w-[250px]">{selectedDistributor.address}</span>
                        </div>
                        <div className="border-t border-elevated" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-contrast-secondary">City / Region</span>
                          <span className="text-sm font-medium text-contrast-primary">{selectedDistributor.city}</span>
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
                              <p className="text-[11px] text-contrast-secondary">{selectedDistributor.createdDate}</p>
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
                              <p className="text-xs font-medium text-contrast-primary">Submitted</p>
                              <p className="text-[11px] text-contrast-secondary">{selectedDistributor.submitted}</p>
                            </div>
                          </div>
                        </div>
                        {selectedDistributor.ordersCount > 0 && (
                          <>
                            <div className="border-t border-elevated" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                                  <BarChart3 className="w-4 h-4 text-violet-600" />
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-contrast-primary">Orders Processed</p>
                                  <p className="text-[11px] text-contrast-secondary">{selectedDistributor.ordersCount} total</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {!selectedDistributor.isVerified && (
                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={() => {
                            setConfirmAction({ type: 'reject', row: selectedDistributor });
                            setSelectedDistributor(null);
                          }}
                          className="flex-1 px-4 py-2.5 rounded-[20px] text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => {
                            setConfirmAction({ type: 'verify', row: selectedDistributor });
                            setSelectedDistributor(null);
                          }}
                          className="flex-1 px-4 py-2.5 rounded-[20px] text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all"
                        >
                          Verify Distributor
                        </button>
                      </div>
                    )}
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
                    onClick={() => { action.action(confirmAction.row.id); }}
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

export default DistributorApprovals;
