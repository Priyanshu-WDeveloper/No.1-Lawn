import { Ellipsis, Eye, Pencil } from 'lucide-react';

import type { ColumnDef } from '@/components/data-table/data-table';
import DataTable, {
  ActionButton,
} from '@/components/data-table/data-table';
import { AppLayout } from '@/components/layout/app-layout';
import { Navbar } from '@/components/layout/navbar';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { useGetJobsQuery } from '../../../API/api';
import { useMemo } from 'react';
import { StatusBadge } from '../../../components/data-table/status-badge';
import { STATUS_CONFIG } from '@/constants/status-config';
import { formatDate } from '../../../lib/format-date';
import type { IJob } from '../../../types';

const mockJobs: IJob[] = [
  {
    _id: 'JOB-001',
    customer: 'Babu Kondepudi',
    employee: 'Sarah Miller',
    address: '383A Richardson Road, Mount Roskill',
    jobType: 'Recurring',
    date: '2026-05-10',
    status: 'completed',
    paymentType: 'Bank Transfer',
  },
  {
    _id: 'JOB-002',
    customer: 'John Doe',
    employee: 'Aman Sharma',
    address: '45 Park Avenue, Auckland',
    jobType: 'One Time',
    date: '2026-05-11',
    status: 'pending',
    paymentType: 'Cash',
  },
  {
    _id: 'JOB-003',
    customer: 'Jane Smith',
    employee: 'Karan Mehta',
    address: '78 Lake View, Hamilton',
    jobType: 'Recurring',
    date: '2026-05-12',
    status: 'cancelled',
    paymentType: 'Online',
  },
  {
    _id: 'JOB-004',
    customer: 'Michael Brown',
    employee: 'Sandeep Kumar',
    address: '12 Green Colony, Wellington',
    jobType: 'One Time',
    date: '2026-05-13',
    status: 'in-progress',
    paymentType: 'Bank Transfer',
  },
];

export default function JobManagementPage() {
  const navigate = useNavigate();
  const { data: apiJobs, isLoading } = useGetJobsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const allJobs = useMemo(() => {
    const apiRows: IJob[] = (apiJobs?.jobs ?? []).map((job: any) => ({
      _id: job._id || job.id,
      customer: job.customer,
      employee: job.employee,
      address: job.address,
      jobType: job.jobType || 'One Time',
      date: job.date,
      status: job.status || 'pending',
      paymentType: job.paymentType || 'Bank Transfer',
    }));
    return [...mockJobs, ...apiRows];
  }, [apiJobs]);

  const jobColumns: ColumnDef<IJob>[] = [
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: (row: IJob) => (
        <span className="font-medium text-[#151515]">
          {row.customer}
        </span>
      ),
    },
    {
      accessorKey: 'employee',
      header: 'Employee',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">{row.employee}</span>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">{row.address}</span>
      ),
    },
    {
      accessorKey: 'jobType',
      header: 'Job Type',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">{row.jobType}</span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (row: IJob) => (
        <span className="text-[#6b7280]">{formatDate(row.date)}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: IJob) => (
        <StatusBadge status={row.status} config={STATUS_CONFIG.job} />
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (row: IJob) => (
        <div className="flex items-center gap-1">
          <ActionButton
            icon={<Eye className="h-3.5 w-3.5" />}
            className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] shadow-none"
            onClick={() =>
              navigate(ROUTES.JOBS_VIEW.replace(':id', row._id))
            }
          />
          <ActionButton
            icon={<Pencil className="h-3.5 w-3.5" />}
            className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] shadow-none"
            onClick={() =>
              navigate(ROUTES.JOBS_EDIT.replace(':id', row._id))
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
                className="text-red-500 focus:text-red-500"
                onClick={() => console.log('Delete job:', row._id)}
              >
                Delete Job
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              title="Job Management"
              subtitle="Manage your jobs and view their details."
              showWelcome={false}
            />
            <div className="flex-1 min-h-0 mt-4 flex flex-col">
              <DataTable<IJob>
                data={allJobs}
                loading={isLoading}
                columns={jobColumns}
                title=""
                description=""
                searchPlaceholder="Search jobs by customer, employee or address..."
                filterField="status"
                filterOptions={[
                  'Pending',
                  'In Progress',
                  'Completed',
                  'Cancelled',
                ]}
                addButtonLabel="Add Job"
                onAddClick={() => navigate(ROUTES.JOBS_CREATE)}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
