import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, Filter, MoreHorizontal } from 'lucide-react';

const DataTable = ({
  columns,
  data,
  onRowClick,
  actions,
  searchable = true,
  filterable = true,
  paginated = true,
  pageSize = 10,
  emptyMessage = 'No data available',
  className = '',
  mobileCardTitle,
}) => {
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filtered = data.filter((row) => {
    if (!search) return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginatedData = paginated ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronsUpDown className="w-3 h-3 text-slate-300" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-[#14B8A6]" />
      : <ChevronDown className="w-3 h-3 text-[#14B8A6]" />;
  };

  const getCardTitle = (row) => {
    if (mobileCardTitle && row[mobileCardTitle]) return row[mobileCardTitle];
    const firstCol = columns[0];
    return firstCol?.render ? firstCol.render(row[firstCol.key], row) : row[firstCol?.key] || '';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {(searchable || filterable) && (
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search records..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#1E293B] text-sm text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all"
              />
            </div>
          )}
          {filterable && (
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#1E293B] text-sm text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 hover:border-slate-300 dark:hover:border-white/[0.12] transition-all shadow-sm">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          )}
        </div>
      )}

      <div className="hidden md:block rounded-2xl border border-slate-200 dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#1E293B] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 ${
                      col.sortable ? 'cursor-pointer hover:text-slate-700 dark:hover:text-white/60 transition-colors select-none' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {col.sortable && <SortIcon field={col.key} />}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-16 text-center text-slate-400 dark:text-white/30 text-sm">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, i) => (
                  <motion.tr
                    key={row.id || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => onRowClick?.(row)}
                    className={`border-b border-slate-50 dark:border-white/[0.04] transition-colors ${
                      onRowClick ? 'cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/[0.02]' : ''
                    } ${i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/30 dark:bg-white/[0.02]'}`}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3.5 text-slate-700 dark:text-white/70">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-5 py-3.5 text-right">
                        <button className="p-1.5 rounded-lg text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {paginatedData.length === 0 ? (
          <div className="p-8 text-center text-slate-400 dark:text-white/30 text-sm bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.08]">
            {emptyMessage}
          </div>
        ) : (
          paginatedData.map((row, i) => (
            <motion.div
              key={row.id || i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onRowClick?.(row)}
              className={`bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.08] p-4 ${
                onRowClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                  {getCardTitle(row)}
                </h4>
                {actions && (
                  <button className="p-1.5 rounded-lg text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all ml-2 flex-shrink-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {columns.map((col) => (
                  <div key={col.key} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400 dark:text-white/30 flex-shrink-0">{col.label}</span>
                    <span className="text-xs text-slate-700 dark:text-white/70 text-right truncate ml-2">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {paginated && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400 dark:text-white/30">
            Showing {(page - 1) * pageSize + 1}&ndash;{Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 hover:bg-slate-100 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[44px]"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  p === page
                    ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20'
                    : 'text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 hover:bg-slate-100 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[44px]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
