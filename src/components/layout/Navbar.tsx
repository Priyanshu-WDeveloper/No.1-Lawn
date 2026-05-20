import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccountDropdown from '@/components/account-dropdown';
import { ROUTES } from '@/constants';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

interface NavbarProps {
  title: string;
  subtitle?: string;
  showWelcome?: boolean;
  superAccess?: boolean;
}

const roleLabels: Record<number, string> = {
  1: 'Admin',
  2: 'Super Admin',
};

export function Navbar({
  title,
  subtitle = "Here's what's happening with your system today.",
  showWelcome = true,
  superAccess = false,
}: NavbarProps) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const welcomeText = user
    ? `Welcome back, ${roleLabels[user.role] || 'Admin'}`
    : `Welcome back, ${superAccess ? 'Super Admin' : 'Admin'}`;

  return (
    <div className=" px-5 py-1.5 flex items-start justify-between">
      <div>
        <h2 className="text-[22px] font-semibold text-[#151515]">
          {title}
        </h2>
        {showWelcome && (
          <p className="mt-1 text-[13px] text-[#6b7280]">
            {welcomeText}
          </p>
        )}
        {!showWelcome && subtitle && (
          <p className="mt-1 text-[13px] text-[#6b7280]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white">
          <Bell
            className="h-4 w-4"
            onClick={() =>
              navigate(
                superAccess
                  ? ROUTES.SUPER_ADMIN_NOTIFICATIONS
                  : ROUTES.NOTIFICATIONS,
              )
            }
          />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] text-white">
            3
          </span>
        </button>

        <AccountDropdown superAccess={superAccess} />
      </div>
    </div>
  );
}
