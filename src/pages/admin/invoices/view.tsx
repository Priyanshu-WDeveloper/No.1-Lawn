import { useParams, useNavigate } from 'react-router-dom';
import { FileText, DollarSign, User, Calendar } from 'lucide-react';

import { AppLayout } from '@/components/layout/app-layout';
import { ROUTES } from '@/constants';
import { StatusBadge } from '@/components/data-table/status-badge';
import { DetailRow } from '@/components/admin/detail-row';
import { SectionCard } from '@/components/admin/section-card';
import { ViewPageHeader } from '@/components/admin/view-page-header';
import { STATUS_CONFIG } from '@/constants/status-config';

interface InvoiceData {
  _id: string;
  invoiceNumber: string;
  customer: string;
  jobId: string;
  totalAmount: number;
  receivedAmount: number;
  balance: number;
  date: string;
  paymentType: string;
  status: 'paid' | 'pending' | 'overdue';
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const mockInvoice: InvoiceData = {
  _id: 'INV-001',
  invoiceNumber: '41321',
  customer: 'Jason',
  jobId: 'JOB-001',
  totalAmount: 60.0,
  receivedAmount: 60.0,
  balance: 0,
  date: '2026-05-05',
  paymentType: 'Bank Transfer',
  status: 'paid',
  notes: 'Garden cleanup service completed.',
  createdBy: 'Admin',
  createdAt: '2026-05-05T10:00:00Z',
  updatedAt: '2026-05-05T14:30:00Z',
};

export default function InvoiceViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoice = mockInvoice;

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
              title={`Invoice #${invoice.invoiceNumber}`}
              subtitle="Invoice Details"
              onBack={() => navigate(ROUTES.INVOICES)}
              onEdit={() =>
                navigate(ROUTES.INVOICES_EDIT.replace(':id', id!))
              }
              deleteLabel="Delete Invoice"
            />

            <div className="mb-4">
              <StatusBadge
                status={invoice.status}
                config={STATUS_CONFIG.invoice}
              />
            </div>

            <div className="space-y-6">
              <SectionCard
                icon={<User className="h-4 w-4 text-[#16610E]" />}
                title="Customer & Job"
              >
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Customer"
                  value={invoice.customer}
                />
                <DetailRow
                  icon={<FileText className="h-4 w-4" />}
                  label="Job"
                  value={invoice.jobId}
                  isLast
                />
              </SectionCard>

              <SectionCard
                icon={
                  <DollarSign className="h-4 w-4 text-[#16610E]" />
                }
                title="Payment Summary"
              >
                <DetailRow
                  icon={<DollarSign className="h-4 w-4" />}
                  label="Total Amount"
                  value={`$${invoice.totalAmount.toFixed(2)}`}
                />
                <DetailRow
                  icon={<DollarSign className="h-4 w-4" />}
                  label="Received"
                  value={`$${invoice.receivedAmount.toFixed(2)}`}
                  valueClassName="text-sm font-medium text-green-600"
                />
                <DetailRow
                  icon={<DollarSign className="h-4 w-4" />}
                  label="Balance"
                  value={`$${invoice.balance.toFixed(2)}`}
                  valueClassName={`text-sm font-medium ${invoice.balance > 0 ? 'text-red-500' : 'text-green-600'}`}
                />
                <DetailRow
                  icon={<DollarSign className="h-4 w-4" />}
                  label="Payment Type"
                  value={invoice.paymentType}
                  isLast
                />
              </SectionCard>

              <SectionCard
                icon={<Calendar className="h-4 w-4 text-[#16610E]" />}
                title="Details & Notes"
              >
                <DetailRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Invoice Date"
                  value={invoice.date}
                />
                <DetailRow
                  icon={<FileText className="h-4 w-4" />}
                  label="Notes"
                  value={invoice.notes || 'Not provided'}
                  isLast
                />
              </SectionCard>

              <SectionCard
                icon={<Calendar className="h-4 w-4 text-[#16610E]" />}
                title="Timestamps"
              >
                <DetailRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Created By"
                  value={invoice.createdBy}
                />
                <DetailRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Created At"
                  value={formatDate(invoice.createdAt)}
                />
                <DetailRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Last Updated"
                  value={formatDate(invoice.updatedAt)}
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
