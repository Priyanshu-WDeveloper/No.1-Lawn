import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccountDropdown from '@/components/account-dropdown';

interface NavbarProps {
  title: string;
  subtitle?: string;
  showWelcome?: boolean;
}

export function Navbar({
  title,
  subtitle = "Here's what's happening with your system today.",
  showWelcome = true,
}: NavbarProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-3 px-4 flex items-center justify-between flex-col sm:flex-row">
      <div className="pb-4">
        {showWelcome && (
          <p className="text-[13px] text-[#777]">
            Welcome back! 👋
          </p>
        )}
        <h2 className="text-[24px] font-bold text-[#151515]">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-[13px] text-[#777]">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white">
          <Bell className="h-4 w-4" onClick={() => navigate('/notifications')} />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] text-white">
            3
          </span>
        </button>

        <div className="flex items-center justify-end">
          <AccountDropdown />
        </div>
      </div>
    </div>
  );
}