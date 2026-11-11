import type { ReactNode } from 'react';

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  hint?: string;
  className?: string;
}

export default function Switch({ checked, onChange, label, hint, className }: Props) {
  return (
    <label className={`switch-row ${className ?? ''}`}>
      <input type="checkbox" role="switch" className="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>
        {label}
        {hint && <small>{hint}</small>}
      </span>
    </label>
  );
}
