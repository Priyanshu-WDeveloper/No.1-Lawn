'use client';

import { Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/layout/Sidebar';
import CustomerTable from '@/components/data-table/customer-table';

export default function CustomerManagementPage() {
  return (
    <SidebarProvider>
      <div className="h-screen overflow-hidden w-full bg-[#F4F7EF] p-1.5">
        <div className="flex h-full rounded-[28px] bg-[#f8f8f5] shadow-2xl">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Content */}
          <main className="flex-1 w-full overflow-y-auto">
            <div className="min-h-full w-full p-4 md:p-6 xl:p-5">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#151515] xl:text-4xl">
                    Customer Management
                  </h2>

                  <p className="mt-2 text-base text-[#777]">
                    Manage your customers and view their details.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e5e5] bg-white">
                    <Bell className="h-5 w-5" />

                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                      3
                    </span>
                  </button>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#ececec] bg-white px-4 py-2 shadow-sm">
                    <Avatar>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>

                    <span className="font-semibold">Admin</span>

                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Customer Table */}
              <CustomerTable />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
