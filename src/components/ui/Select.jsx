import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(
  (
    {
      label,
      error,
      options = [],
      placeholder = 'Select...',
      className = '',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-slate-600">{label}</label>
        )}
        <div className="relative">
          <select
            ref={ref}
            value={value}
            onChange={onChange}
            className={`w-full rounded-2xl border bg-white px-4 py-2.5 text-sm text-slate-700 appearance-none transition-all focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                : 'border-slate-200 focus:border-[#14B8A6]/50 focus:ring-[#14B8A6]/20'
            } ${className}`}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
