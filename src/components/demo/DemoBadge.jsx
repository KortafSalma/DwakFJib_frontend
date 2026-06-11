import { Monitor } from 'lucide-react';

const DemoBadge = ({ size = 'sm' }) => {
  const sizeClasses = size === 'lg'
    ? 'px-4 py-2 text-sm gap-2'
    : 'px-2.5 py-1 text-[10px] gap-1.5';

  return (
    <div
      className={`inline-flex items-center ${sizeClasses} rounded-full font-semibold border shadow-sm`}
      style={{
        backgroundColor: '#FEF3C7',
        borderColor: '#FCD34D',
        color: '#92400E'
      }}
    >
      <Monitor className={size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} />
      <span>DEMO</span>
    </div>
  );
};

const DemoDataBadge = () => (
  <div
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border shadow-sm"
    style={{
      backgroundColor: '#DBEAFE',
      borderColor: '#93C5FD',
      color: '#1E40AF'
    }}
  >
    <Monitor className="w-3 h-3" />
    <span>DEMO DATA</span>
  </div>
);

export { DemoBadge, DemoDataBadge };
