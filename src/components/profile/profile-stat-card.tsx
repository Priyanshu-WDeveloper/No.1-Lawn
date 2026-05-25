interface ProfileStatCardProps {
  label: string;
  value: string | number;
  accentColor?: string;
  delay?: number;
}

export default function ProfileStatCard({ label, value, accentColor = 'var(--primary)', delay = 0 }: ProfileStatCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-border p-5 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute inset-y-2 left-0 w-1 rounded-full" style={{ backgroundColor: accentColor }} />
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1.5">{value}</p>
    </div>
  );
}
