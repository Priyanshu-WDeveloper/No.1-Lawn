import { useParams, useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  CreditCard,
  Clock,
  RefreshCw,
} from 'lucide-react';

import { AppLayout } from '@/components/layout/app-layout';
import { ROUTES } from '@/constants';
import { StaticMap } from '@/components/google-maps/static-map';
import { StatusBadge } from '../../../components/data-table/status-badge';
import { DetailRow } from '../../../components/admin/detail-row';
import { SectionCard } from '../../../components/admin/section-card';
import { ViewPageHeader } from '../../../components/admin/view-page-header';
import { STATUS_CONFIG } from '../../../constants/status-config';

interface JobData {
  jobId: string;
  assignedCustomer: {
    customerId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
  };
  assignedEmployee: {
    employeeId: string;
    name: string;
    address: string;
    contact: {
      email: string;
      phone: string;
    };
    status: string;
  };
  jobAddress: {
    addressLine: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  jobType: string;
  frequency: {
    value: number;
    unit: string;
  };
  paymentType: string;
  notes: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  active: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const mockJob: JobData = {
  jobId: 'JOB-001',
  assignedCustomer: {
    customerId: 'CUST-001',
    name: 'Babu',
    email: 'babu_kondepudi@yahoo.co.nz',
    phone: '0211470500',
    address: '383A Richardson Road Mount Roskill',
    status: 'Active',
  },
  assignedEmployee: {
    employeeId: 'EMP-001',
    name: 'Sarah Miller',
    address: 'Auckland, New Zealand',
    contact: {
      email: 'sarah.m@clovant.com',
      phone: '+64-XX-XXX-XXXX',
    },
    status: 'Active',
  },
  jobAddress: {
    addressLine: '383A Richardson Road Mount Roskill',
    postalCode: '1041',
    city: 'Auckland',
    state: 'Auckland',
    country: 'New Zealand',
    location: {
      lat: -36.909,
      lng: 174.731,
    },
  },
  jobType: 'Recurring',
  frequency: {
    value: 2,
    unit: 'Week',
  },
  paymentType: 'Bank Transfer',
  notes: 'Customer requested weekend servicing only.',
  status: 'pending',
  active: true,
  createdBy: 'Aman',
  createdAt: '2026-05-14T10:30:00Z',
  updatedAt: '2026-05-14T10:30:00Z',
};

export default function JobViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = mockJob;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto px-4 py-5">
          <div className="flex w-full flex-col">
            <ViewPageHeader
              title={job.jobId}
              subtitle="Job Details"
              onBack={() => navigate(ROUTES.JOBS)}
              onEdit={() =>
                navigate(ROUTES.JOBS_EDIT.replace(':id', id!))
              }
              deleteLabel="Delete Job"
            />

            <div className="mb-4 flex items-center gap-3">
              <StatusBadge
                status={job.status}
                config={STATUS_CONFIG.job}
              />
            </div>

            <div className="space-y-6">
              <SectionCard
                icon={<User className="h-4 w-4 text-[#16610E]" />}
                title="Customer Details"
              >
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Name"
                  value={job.assignedCustomer.name}
                />
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Email"
                  value={job.assignedCustomer.email}
                />
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Phone"
                  value={job.assignedCustomer.phone}
                  isLast
                />
              </SectionCard>

              <SectionCard
                icon={<User className="h-4 w-4 text-[#16610E]" />}
                title="Assigned Employee"
              >
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Name"
                  value={job.assignedEmployee.name}
                />
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Employee ID"
                  value={job.assignedEmployee.employeeId}
                />
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Email"
                  value={job.assignedEmployee.contact.email}
                />
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Phone"
                  value={job.assignedEmployee.contact.phone}
                  isLast
                />
              </SectionCard>

              <SectionCard
                icon={<MapPin className="h-4 w-4 text-[#16610E]" />}
                title="Job Location"
              >
                <DetailRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Address"
                  value={job.jobAddress.addressLine}
                />
                <DetailRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="City"
                  value={job.jobAddress.city}
                />
                <DetailRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Postal Code"
                  value={job.jobAddress.postalCode}
                />
                <DetailRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Coordinates"
                  value={`${job.jobAddress.location.lat}, ${job.jobAddress.location.lng}`}
                  isLast
                />

                <div className="mt-4">
                  <StaticMap
                    lat={job.jobAddress.location.lat}
                    lng={job.jobAddress.location.lng}
                    height={300}
                  />
                </div>
              </SectionCard>

              <SectionCard
                icon={
                  <RefreshCw className="h-4 w-4 text-[#16610E]" />
                }
                title="Schedule"
              >
                <DetailRow
                  icon={<RefreshCw className="h-4 w-4" />}
                  label="Job Type"
                  value={job.jobType}
                />
                <DetailRow
                  icon={<RefreshCw className="h-4 w-4" />}
                  label="Frequency"
                  value={`Every ${job.frequency.value} ${job.frequency.unit}`}
                  isLast
                />
              </SectionCard>

              <SectionCard
                icon={
                  <CreditCard className="h-4 w-4 text-[#16610E]" />
                }
                title="Payment & Notes"
              >
                <DetailRow
                  icon={<CreditCard className="h-4 w-4" />}
                  label="Payment Type"
                  value={job.paymentType}
                />
                <DetailRow
                  icon={<CreditCard className="h-4 w-4" />}
                  label="Notes"
                  value={job.notes || 'Not provided'}
                  isLast
                />
              </SectionCard>

              <SectionCard
                icon={<Clock className="h-4 w-4 text-[#16610E]" />}
                title="Timestamps"
              >
                <DetailRow
                  icon={<Clock className="h-4 w-4" />}
                  label="Created By"
                  value={job.createdBy}
                />
                <DetailRow
                  icon={<Clock className="h-4 w-4" />}
                  label="Created At"
                  value={formatDate(job.createdAt)}
                />
                <DetailRow
                  icon={<Clock className="h-4 w-4" />}
                  label="Last Updated"
                  value={formatDate(job.updatedAt)}
                  isLast
                />
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
