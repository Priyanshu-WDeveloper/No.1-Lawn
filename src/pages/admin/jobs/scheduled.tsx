import { useState } from 'react';
import { Ellipsis, Eye, Check, Ban } from 'lucide-react';
import toast from 'react-hot-toast';

import type { ColumnDef } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import { AppLayout } from '@/components/layout/app-layout';
import { Navbar } from '@/components/layout/navbar';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGetChildJobsQuery,
  useCancelJobMutation,
  useCompleteJobMutation,
  useCreateJobReceiptMutation,
} from '@/API/api';
import { StatusBadge } from '@/components/data-table/status-badge';
import { STATUS_CONFIG } from '@/constants/status-config';
import { formatDate } from '@/lib/format-date';
import { getErrorMessage } from '@/lib/get-error-message';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { CompleteJobDialog } from '@/components/admin/complete-job-dialog';
import { useDataTableQueryParams } from '@/hooks/use-data-table-query-params';
import type { IJob } from '@/types';
import type { ListQueryParams } from '@/types/api.types';

export default function ScheduledJobsPage() {
  const navigate = useNavigate();

  const {
    setPage,
    setLimit,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sort,
    setSort,
    queryParams,
  } = useDataTableQueryParams<ListQueryParams>({
    defaultLimit: 10,
    defaultStatus: 'Pending',
    mapStatusToApi: (status) =>
      status.toLowerCase().replace(' ', '-') as
        | 'pending'
        | 'completed'
        | 'cancelled'
        | 'upcoming',
  });

  const { data: apiData, isLoading } = useGetChildJobsQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [cancelJob] = useCancelJobMutation();
  const [completeJob] = useCompleteJobMutation();
  const [createJobReceipt] = useCreateJobReceiptMutation();

  const [confirmAction, setConfirmAction] = useState<{
    type: 'complete' | 'cancel';
    jobId: string;
  } | null>(null);

  const childJobs = apiData?.jobs ?? [];
  const totalPages =
    apiData?.totalPages ??
    Math.ceil((apiData?.total ?? 0) / (apiData?.limit ?? 10));
  const pagination = apiData
    ? {
        page: apiData.page,
        limit: apiData.limit,
        total: apiData.total,
        totalPages,
      }
    : undefined;

  const handleCancel = async (id: string) => {
    try {
      await cancelJob({ jobId: id }).unwrap();
      toast.success('Job cancelled successfully');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to cancel job'));
    }
  };

  const handleComplete = async (
    id: string,
    receivePrice?: number,
  ) => {
    try {
      await completeJob({ jobId: id, receivePrice }).unwrap();
      await createJobReceipt(id).unwrap();
      toast.success('Job completed successfully');
      setConfirmAction(null);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to complete job'));
    }
  };

  const getCustomerName = (customerId: unknown): string => {
    if (typeof customerId === 'object' && customerId) {
      const c = customerId as Record<string, unknown>;
      const first = (c.firstName as string) ?? '';
      const last = (c.lastName as string) ?? '';
      return `${first} ${last}`.trim() || '-';
    }
    return '-';
  };

  const getEmployeeName = (employeeId: unknown): string => {
    if (typeof employeeId === 'object' && employeeId) {
      const e = employeeId as Record<string, unknown>;
      const first = (e.firstName as string) ?? '';
      const last = (e.lastName as string) ?? '';
      return `${first} ${last}`.trim() || '-';
    }
    return '-';
  };

  const columns: ColumnDef<IJob>[] = [
    {
      accessorKey: 'jobId',
      header: 'JobId',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">{row.jobId}</span>
      ),
    },
    {
      accessorKey: 'customerId',
      header: 'Customer',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">
          {getCustomerName(row.customerId)}
        </span>
      ),
    },
    {
      accessorKey: 'employeeId',
      header: 'Employee',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">
          {getEmployeeName(row.employeeId)}
        </span>
      ),
    },
    {
      accessorKey: 'jobDate',
      header: 'Date',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">
          {formatDate(row.jobDate || '')}
        </span>
      ),
    },
    {
      accessorKey: 'paymentType',
      header: 'Payment Type',
      cell: (row: IJob) => (
        <span className="text-[#6b7280] capitalize">
          {row.paymentType?.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">
          {row.price != null ? `$${row.price}` : '-'}
        </span>
      ),
    },
    // {
    //   accessorKey: 'address',
    //   header: 'Address',
    //   cell: (row: IJob) => (
    //     <span className="text-[#6b7280]">{row.address}</span>
    //   ),
    // },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: IJob) => (
        <StatusBadge
          status={row.status ?? ''}
          config={STATUS_CONFIG.job}
        />
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (row: IJob) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              navigate(ROUTES.JOBS_VIEW.replace(':id', row._id ?? ''))
            }
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm font-medium bg-[#f5f5f5] text-[#374151] hover:bg-[#e5e5e5] transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>
          {row.status === 'pending' && row.jobType === 'one_time' && (
            <>
              <button
                type="button"
                onClick={() =>
                  setConfirmAction({
                    type: 'complete',
                    jobId: row._id ?? '',
                  })
                }
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
                Complete
              </button>
              {/* <button
                type="button"
                onClick={() =>
                  setConfirmAction({
                    type: 'cancel',
                    jobId: row._id ?? '',
                  })
                }
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Ban className="h-3.5 w-3.5" />
                Cancel
              </button> */}
            </>
          )}
          {row.status !== 'completed' &&
            row.status !== 'cancelled' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#6b7280] hover:bg-[#f5f5f5] transition-colors"
                  >
                    <Ellipsis className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {row.status === 'pending' && (
                    <DropdownMenuItem
                      onClick={() =>
                        setConfirmAction({
                          type: 'cancel',
                          jobId: row._id ?? '',
                        })
                      }
                    >
                      <Ban className="mr-2 h-4 w-4 text-red-500" />
                      <span>Cancel Job</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 w-full px-5 py-4 min-h-0 flex flex-col">
          <div className="flex w-full flex-col flex-1">
            <Navbar
              title="Scheduled Jobs"
              subtitle="View and manage scheduled child jobs from recurring parents."
              showWelcome={false}
            />
            <div className="flex-1 min-h-0 mt-4 flex flex-col">
              <DataTable<IJob>
                data={childJobs}
                loading={isLoading}
                columns={columns}
                title=""
                description=""
                searchPlaceholder="Search scheduled jobs..."
                searchValue={search}
                onSearchChange={setSearch}
                filterField="status"
                filterOptions={[
                  'Pending',
                  'Completed',
                  'Cancelled',
                  'Upcoming',
                ]}
                filterValue={statusFilter}
                onFilterChange={setStatusFilter}
                serverSideFiltering
                sortValue={sort}
                onSortChange={setSort}
                serverSideSorting
                pagination={pagination}
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

      <CompleteJobDialog
        open={confirmAction?.type === 'complete'}
        onOpenChange={(open) => {
          if (!open) setConfirmAction(null);
        }}
        onConfirm={async (receivePrice) => {
          if (confirmAction)
            await handleComplete(confirmAction.jobId, receivePrice);
        }}
      />
      <ConfirmDialog
        open={confirmAction?.type === 'cancel'}
        onOpenChange={(open) => {
          if (!open) setConfirmAction(null);
        }}
        title="Cancel Job"
        description="Are you sure you want to cancel this scheduled job?"
        confirmText="Cancel Job"
        onConfirm={async () => {
          if (confirmAction) await handleCancel(confirmAction.jobId);
          setConfirmAction(null);
        }}
      />
    </AppLayout>
  );
}
