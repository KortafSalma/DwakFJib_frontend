import { useState } from 'react';
import { Search, Truck } from 'lucide-react';
import DataTable from '../ui/DataTable';
import EmptyState from '../ui/EmptyState';

const statusColors = {
  PENDING: 'text-contrast-secondary',
  PROCESSING: 'text-secondary',
  SHIPPED: 'text-blue-400',
  IN_TRANSIT: 'text-yellow-400',
  DELIVERED: 'text-primary',
  CANCELLED: 'text-red-400',
};

const ShipmentTable = ({ shipments = [], onRowClick }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = shipments.filter((s) => {
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase()) || s.pharmacy.toLowerCase().includes(search.toLowerCase()) || s.driver.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: 'id', label: 'Shipment', sortable: true, render: (_, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
          <Truck className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="font-medium text-sm">{row.id}</p>
          <p className="text-[10px] text-contrast-muted">{row.pharmacy}</p>
        </div>
      </div>
    )},
    { key: 'route', label: 'Route', render: (_, row) => <span className="text-xs text-contrast-secondary">{row.origin} → {row.destination}</span> },
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'items', label: 'Items', sortable: true },
    { key: 'progress', label: 'Progress', sortable: true, render: (val) => (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-dark/30 overflow-hidden max-w-[80px]">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${val}%` }} />
        </div>
        <span className="text-xs font-mono">{val}%</span>
      </div>
    )},
    { key: 'status', label: 'Status', sortable: true, render: (val) => <span className={`text-xs font-medium ${statusColors[val]}`}>{val.replace('_', ' ')}</span> },
    { key: 'estimatedDelivery', label: 'ETA', sortable: true },
  ];

  if (filtered.length === 0) {
    return <EmptyState icon={Truck} title="No shipments found" description="Try adjusting your search or filter" />;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shipments..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark/50 border border-primary/10 text-sm text-white placeholder-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'PENDING', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s ? 'bg-primary/10 text-primary border border-primary/20' : 'text-contrast-secondary hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={onRowClick} actions searchable={false} />
    </div>
  );
};

export default ShipmentTable;
