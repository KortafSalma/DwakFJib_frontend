const ToggleSwitch = ({ enabled, onChange, className = '' }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${enabled ? 'bg-[#14B8A6]' : 'bg-elevated'} ${className}`}
  >
    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-transform duration-300 ${enabled ? 'translate-x-5' : ''}`} />
  </button>
);

export default ToggleSwitch;
