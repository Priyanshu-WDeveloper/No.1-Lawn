interface ProfileFieldProps {
  label: string;
  value: string | number | undefined | null;
  fullWidth?: boolean;
  editing?: boolean;
  name?: string;
  onChange?: (val: string) => void;
}

export default function ProfileField({ label, value, fullWidth, editing, onChange }: ProfileFieldProps) {
  if (editing && onChange) {
    return (
      <div className={fullWidth ? 'sm:col-span-2' : ''}>
        <p className="text-xs font-medium tracking-wide text-[#8a8a8a] uppercase">{label}</p>
        <div className="mt-1 bg-white border border-gray-200 rounded-lg min-h-[38px]">
          <input
            value={String(value ?? '')}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-[#151515] font-medium outline-none focus:ring-2 focus:ring-[var(--sidebar-active)] focus:border-transparent text-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <p className="text-xs font-medium tracking-wide text-[#8a8a8a] uppercase">{label}</p>
      <div className="mt-1 bg-[#f9fafb] border border-transparent rounded-lg px-3 py-2 min-h-[38px] flex items-center">
        <p className="text-[#151515] font-medium">{value ?? '-'}</p>
      </div>
    </div>
  );
}
