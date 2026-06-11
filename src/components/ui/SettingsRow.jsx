import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const SettingsRow = ({ label, description, default: defaultEnabled }) => {
  const [enabled, setEnabled] = useState(defaultEnabled);
  return (
    <div className="flex items-center justify-between py-4 border-b border-elevated last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-contrast-primary">{label}</p>
        <p className="text-[11px] text-contrast-muted mt-0.5">{description}</p>
      </div>
      <ToggleSwitch enabled={enabled} onChange={setEnabled} />
    </div>
  );
};

export default SettingsRow;
