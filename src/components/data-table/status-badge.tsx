// interface StatusConfig {
//   color: string;
//   label: string;
// }

// interface StatusBadgeProps {
//   status: string;
//   config: Record<string, StatusConfig>;
//   fallback?: StatusConfig;
// }

// export function StatusBadge({
//   status,
//   config,
//   fallback = { color: '#6b7280', label: 'Unknown' },
// }: StatusBadgeProps) {
//   const cfg = config[status] || fallback;

//   return (
//     <span className="inline-flex items-center gap-1.5 text-xs font-medium">
//       <span
//         className="h-2 w-2 rounded-full"
//         style={{ backgroundColor: cfg.color }}
//       />
//       <span style={{ color: cfg.color }}>{cfg.label}</span>
//     </span>
//   );
// }

interface StatusConfig {
  color: string;
  label: string;
}

interface StatusBadgeProps {
  status: string;
  config: Record<string, StatusConfig>;
  fallback?: StatusConfig;
  className?: string;
  label?: string;
}

export function StatusBadge({
  status,
  config,
  fallback = { color: '#6b7280', label: 'Unknown' },
  className = '',
  label,
}: StatusBadgeProps) {
  const cfg = config[status] || fallback;
  const displayLabel = label ?? cfg.label;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        backdrop-blur-sm
        ${className}
      `}
      style={{
        backgroundColor: `${cfg.color}15`,
        borderColor: `${cfg.color}30`,
        color: cfg.color,
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: cfg.color }}
      />

      <span>{displayLabel}</span>
    </span>
  );
}
