import { useState } from 'react';
import { Search, Pill } from 'lucide-react';
import DataTable from '../ui/DataTable';
import EmptyState from '../ui/EmptyState';
import formatMAD from '../../utils/currency';

const statusColors = {
  IN_STOCK: 'text-primary',
  LOW_STOCK: 'text-yellow-400',
  OUT_OF_STOCK: 'text-red-400',
  RESERVED: 'text-secondary',
  EXPIRED: 'text-contrast-secondary',
};

const MedicationTable = ({ medications = [], onRowClick }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = medications.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: 'name', label: 'Medication', sortable: true, render: (_, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
          <Pill className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="font-medium text-sm">{row.name}</p>
          <p className="text-[10px] text-contrast-muted">{row.category} · {row.dosage}</p>
        </div>
      </div>
    )},
    { key: 'stock', label: 'Stock', sortable: true, render: (val, row) => (
      <span className={`text-sm font-semibold ${statusColors[row.status]}`}>{val}</span>
    )},
    { key: 'status', label: 'Status', sortable: true, render: (val) => (
      <span className={`text-xs font-medium ${statusColors[val]}`}>{val.replace('_', ' ')}</span>
    )},
    { key: 'price', label: 'Price', sortable: true, render: (val) => <span className="text-sm font-mono">{formatMAD(val)}</span> },
    { key: 'expiryDate', label: 'Expiry', sortable: true },
    { key: 'reservations', label: 'Reserved', sortable: true },
  ];

  if (filtered.length === 0) {
    return <EmptyState icon={Pill} title="No medications found" description="Try adjusting your search or filter" />;
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
            placeholder="Search medications..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark/50 border border-primary/10 text-sm text-white placeholder-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'EXPIRED'].map((s) => (
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

export default MedicationTable;
