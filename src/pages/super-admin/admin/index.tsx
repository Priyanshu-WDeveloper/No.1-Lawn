import React, { useState, useEffect } from 'react';
import { SuperAdminLayout } from '@/components/layout/SuperAdminLayout';
import { Navbar } from '@/components/layout/Navbar';
import { Eye, Pencil, Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable, {
  ActionButton,
  type ColumnDef,
} from '../../../components/data-table/DataTable';
import type { IAdmins } from '../../../types/admins.types';
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { ROUTES } from '@/constants';
import {
  useGetAdminUsersQuery,
  useUpdateAdminUserMutation,
} from '../../../API/api';
import type { GetAdminsParams } from '../../../types/api.types';
import { Skeleton } from '../../../components/ui/skeleton';
import { useDebounce } from '../../../hooks/useDebounce';

const SuperAdminAdminsPage: React.FC = () => {
  const navigate = useNavigate();
  const [updateAdminUser] = useUpdateAdminUserMutation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sort, setSort] = useState<string>('createdAt'); // Default: newest first

  const debouncedSearch = useDebounce(search, 300);

  // Reset page when search/filter/sort changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, sort]);

  // Sort mapping: UI state → API format
  const mapSortToApi = (
    sortValue: string,
  ): GetAdminsParams['sort'] => {
    // Name-like fields → a_z / z_a
    if (
      sortValue === 'fullName' ||
      sortValue === 'adminId' ||
      sortValue === 'phoneNumber'
    )
      return 'a_z';
    if (
      sortValue === 'fullName_desc' ||
      sortValue === 'adminId_desc' ||
      sortValue === 'phoneNumber_desc'
    )
      return 'z_a';

    // Date fields → newest / oldest
    if (sortValue === 'createdAt' || sortValue === 'updatedAt')
      return 'newest';
    if (
      sortValue === 'createdAt_desc' ||
      sortValue === 'updatedAt_desc'
    )
      return 'oldest';

    return 'newest'; // Default fallback
  };

  const { data, isLoading } = useGetAdminUsersQuery({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: statusFilter === 'All' ? undefined : statusFilter,
    sort: mapSortToApi(sort),
  });
  const statusConfig: Record<
    string,
    { color: string; label: string }
  > = {
    active: { color: '#22c55e', label: 'Active' },
    inactive: { color: '#ef4444', label: 'Inactive' },
    suspended: { color: '#f59e0b', label: 'Suspended' },
  };

  const handleStatusChange = async (
    id: string,
    status: 'active' | 'inactive',
  ) => {
    try {
      await updateAdminUser({
        id,
        status,
      }).unwrap();

      toast.success(`Admin set to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };
  const adminsColumns: ColumnDef<IAdmins>[] = [
    {
      accessorKey: 'adminId',
      header: 'Admin ID',
      sortable: true,
      skeleton: () => <Skeleton className="h-4 w-16" />,
      cell: (row: IAdmins) => (
        <span className="text-[#6b7280]">{row.adminId}</span>
      ),
    },
    {
      accessorKey: 'fullName',
      header: 'Name',
      sortable: true,
      skeleton: () => (
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ),
      cell: (row: IAdmins) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold"
            style={
              row.fullName
                ? {
                    backgroundColor: `hsl(${(row.fullName.charCodeAt(0) * 137.5) % 360}, 60%, 90%)`,
                    color: `hsl(${(row.fullName.charCodeAt(0) * 137.5) % 360}, 60%, 35%)`,
                  }
                : { backgroundColor: '#edf8e7', color: '#16610E' }
            }
          >
            {row.fullName
              ? row.fullName.charAt(0).toUpperCase()
              : 'A'}
          </div>
          <div>
            <span className="font-medium text-[#151515]">
              {row.fullName || '-'}
            </span>
            <p className="text-xs text-[#6b7280]">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      skeleton: () => (
        <div className="inline-flex items-center gap-1.5">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ),
      cell: (row: IAdmins) => {
        const cfg = statusConfig[row.status] || statusConfig.active;
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: cfg.color }}
            />
            <span style={{ color: cfg.color }}>{cfg.label}</span>
          </span>
        );
      },
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone',
      sortable: true,
      skeleton: () => <Skeleton className="h-4 w-24" />,
      cell: (row: IAdmins) => (
        <span className="text-[#6b7280]">
          {row.countryCode} {row.phoneNumber}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      sortable: true,
      skeleton: () => <Skeleton className="h-4 w-24" />,
      cell: (row: IAdmins) => (
        <span className="text-[#6b7280]">
          {new Date(row.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      sortable: true,
      skeleton: () => <Skeleton className="h-4 w-24" />,
      cell: (row: IAdmins) => (
        <span className="text-[#6b7280]">
          {new Date(row.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      skeleton: () => (
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      ),
      cell: (row: IAdmins) => (
        <div className="flex items-center gap-1">
          <ActionButton
            icon={<Eye className="h-3.5 w-3.5" />}
            className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] shadow-none"
            onClick={() =>
              navigate(
                ROUTES.ADMIN_VIEW.replace(':id', String(row._id)),
                { state: { admin: row } },
              )
            }
          />
          <ActionButton
            icon={<Pencil className="h-3.5 w-3.5" />}
            className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] shadow-none"
            onClick={() =>
              navigate(
                ROUTES.ADMIN_EDIT.replace(':id', String(row._id)),
                { state: { admin: row } },
              )
            }
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ActionButton
                icon={<Ellipsis className="h-3.5 w-3.5" />}
                className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] shadow-none"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  toast.success('Login as Admin — frontend only');
                }}
                className="truncate"
              >
                Login as Admin
              </DropdownMenuItem>
              {row.status === 'active' ? (
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={() =>
                    handleStatusChange(row._id, 'inactive')
                  }
                >
                  Set Inactive
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="text-green-600 focus:text-green-600"
                  onClick={() =>
                    handleStatusChange(row._id, 'active')
                  }
                >
                  Set Active
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  toast.success('Change Password — frontend only');
                }}
                className="truncate"
              >
                Change Password
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <SuperAdminLayout>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 w-full px-5 py-4 min-h-0 flex flex-col">
          <div className="flex w-full flex-col flex-1">
            <Navbar
              superAccess
              title="Admin Users"
              subtitle="Manage admin accounts and permissions"
            />
            <div className="flex-1 min-h-0 mt-4 flex flex-col">
              <DataTable<IAdmins>
                data={data?.admins || []}
                columns={adminsColumns}
                loading={isLoading}
                title=""
                description=""
                searchPlaceholder="Search admins by name, email or ID..."
                filterField="status"
                filterOptions={['Active', 'Inactive', 'Suspended']}
                addButtonLabel="Add admin"
                onAddClick={() => navigate(ROUTES.ADMIN_CREATE)}
                // Controlled mode props for server-side filtering
                searchValue={search}
                onSearchChange={setSearch}
                filterValue={statusFilter}
                onFilterChange={setStatusFilter}
                sortValue={sort}
                onSortChange={setSort}
                serverSideFiltering
                serverSideSorting
                // Pagination
                pagination={
                  data
                    ? {
                        page: data.page,
                        limit: data.limit,
                        total: data.total,
                        totalPages: data.totalPages,
                      }
                    : undefined
                }
                onPageChange={setPage}
                onLimitChange={(newLimit) => {
                  setLimit(newLimit);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminAdminsPage;
