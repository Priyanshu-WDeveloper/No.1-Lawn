import {
  Briefcase,
  FileText,
  Home,
  ShoppingCart,
  Users,
  UserSquare2,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Dashboard',
    icon: Home,
    url: '/dashboard',
  },
  {
    title: 'User Management',
    icon: Users,
    url: '/users',
  },
  {
    title: 'Customer Management',
    icon: ShoppingCart,
    url: '/customers',
  },
  {
    title: 'Employee Management',
    icon: UserSquare2,
    url: '/employees',
  },
  {
    title: 'Job Management',
    icon: Briefcase,
    url: '/jobs',
  },
  {
    title: 'Invoice',
    icon: FileText,
    url: '/invoices',
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="bg-gradient-to-b from-[#0f5b0c] to-[#0b4308] text-white">
        <div className="flex items-center gap-3 px-4 py-6">
          <img
            src="/image.png"
            alt="logo"
            className="h-10 w-10 rounded-full"
          />

          <h2 className="text-2xl font-bold">No. 1 Lawn</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-[#0f5b0c] to-[#0b4308] text-white">
        <SidebarGroup>
          <SidebarMenu className="space-y-3 px-3">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="
                    h-14
                    rounded-2xl
                    text-base
                    hover:bg-[#2a7d20]
                    data-[active=true]:bg-[#2a7d20]
                  "
                >
                  <a href={item.url}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#0b4308] p-4">
        <div className="rounded-2xl bg-white/10 p-4 text-white backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <span className="font-bold text-[#0b4308]">A</span>
            </div>

            <div>
              <h4 className="font-semibold">Admin</h4>

              <p className="text-sm text-white/70">
                Super Administrator
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
