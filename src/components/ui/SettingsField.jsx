const SettingsField = ({ label, type = 'text', defaultValue, className = '', ...props }) => (
  <div className={`py-3 ${className}`}>
    <label className="block text-xs font-medium text-contrast-secondary mb-1.5">{label}</label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
      {...props}
    />
  </div>
);

export default SettingsField;
