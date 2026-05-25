import type { ReactNode } from 'react';

interface ProfileSectionCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay?: number;
}

export default function ProfileSectionCard({ icon, title, children, delay = 0 }: ProfileSectionCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-border p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
          {icon}
        </div>
        <h2 className="text-base font-bold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
