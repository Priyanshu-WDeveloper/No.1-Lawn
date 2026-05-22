import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { FileText, DollarSign, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import { AppLayout } from '@/components/layout/app-layout';
import { Navbar } from '@/components/layout/navbar';
import { ROUTES } from '@/constants';
import { AdminFormStepper } from '@/components/admin/admin-form-stepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';

const editInvoiceSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  job: z.string().min(1, 'Job is required'),
  totalAmount: z.string().min(1, 'Total amount is required'),
  receivedAmount: z.string().optional(),
  paymentType: z.string().min(1, 'Payment type is required'),
  notes: z.string().optional(),
});

type EditInvoiceFormData = z.infer<typeof editInvoiceSchema>;

const steps = [
  {
    id: 1,
    title: 'Invoice Details',
    description: 'Customer & Job',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 2,
    title: 'Payment',
    description: 'Amount & method',
    icon: <DollarSign className="h-4 w-4" />,
  },
];

function ReviewCard({ formData }: { formData: EditInvoiceFormData }) {
  return (
    <div className="rounded-xl border border-dashed border-[#e5e5e5] bg-[#fafaf8] p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf8e7]">
          <Check className="h-6 w-6 text-[#16610E]" />
        </div>
        <h5 className="mb-2 text-lg font-semibold text-[#151515]">
          Review Invoice Information
        </h5>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Customer</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.customer || 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Job</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.job || 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Total Amount</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.totalAmount
                ? `$${formData.totalAmount}`
                : 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Received</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.receivedAmount
                ? `$${formData.receivedAmount}`
                : 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Payment Type</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.paymentType || 'Not provided'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditInvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditInvoiceFormData>({
    resolver: zodResolver(editInvoiceSchema),
    defaultValues: {
      customer: 'cust-1',
      job: 'job-1',
      totalAmount: '60.00',
      receivedAmount: '60.00',
      paymentType: 'bank-transfer',
      notes: 'Garden cleanup service completed.',
    },
  });

  const formValues = watch();

  const handleNext = async () => {
    let fieldsToValidate: (keyof EditInvoiceFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['customer', 'job'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data: EditInvoiceFormData) => {
    console.log('Updating invoice:', data);
    toast.success('Invoice updated successfully');
    navigate(ROUTES.INVOICES_VIEW.replace(':id', id!));
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#777]">
              Invoice Details
            </h4>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#151515]">
                  Select Customer
                  <span className="text-[#16610E]"> *</span>
                </label>
                <Select
                  value={formValues.customer || ''}
                  onValueChange={(v) => setValue('customer', v)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]">
                    <SelectValue placeholder="Choose a customer" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="cust-1">
                      Babu Kondepudi
                    </SelectItem>
                    <SelectItem value="cust-2">John Doe</SelectItem>
                    <SelectItem value="cust-3">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
                {errors.customer && (
                  <p className="text-sm text-red-500">
                    {errors.customer.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#151515]">
                  Select Job
                  <span className="text-[#16610E]"> *</span>
                </label>
                <Select
                  value={formValues.job || ''}
                  onValueChange={(v) => setValue('job', v)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]">
                    <SelectValue placeholder="Choose a job" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="job-1">
                      JOB-001 - Lawn Mowing
                    </SelectItem>
                    <SelectItem value="job-2">
                      JOB-002 - Garden Cleanup
                    </SelectItem>
                    <SelectItem value="job-3">
                      JOB-003 - Tree Trimming
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.job && (
                  <p className="text-sm text-red-500">
                    {errors.job.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#777]">
            Payment Details
          </h4>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#151515]">
                Total Amount
                <span className="text-[#16610E]"> *</span>
              </label>
              <Input
                type="number"
                placeholder="0.00"
                {...register('totalAmount')}
                className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
              />
              {errors.totalAmount && (
                <p className="text-sm text-red-500">
                  {errors.totalAmount.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#151515]">
                Received Amount
              </label>
              <Input
                type="number"
                placeholder="0.00"
                {...register('receivedAmount')}
                className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#151515]">
                Payment Type
                <span className="text-[#16610E]"> *</span>
              </label>
              <Select
                value={formValues.paymentType || ''}
                onValueChange={(v) => setValue('paymentType', v)}
              >
                <SelectTrigger className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="bank-transfer">
                    Bank Transfer
                  </SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentType && (
                <p className="text-sm text-red-500">
                  {errors.paymentType.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <label className="text-sm font-medium text-[#151515]">
              Notes
            </label>
            <Textarea
              placeholder="Add any additional notes..."
              {...register('notes')}
              className="min-h-[100px] rounded-xl border-[#e5e5e5] bg-[#fafaf8] p-4"
            />
          </div>
        </div>

        <ReviewCard formData={formValues} />
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto px-4 py-5">
          <div className="flex w-full flex-col">
            <Navbar
              title="Edit Invoice"
              subtitle="Update invoice details and payment."
              showWelcome={false}
            />

            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  navigate(ROUTES.INVOICES_VIEW.replace(':id', id!))
                }
                className="text-[#6b7280] hover:text-[#151515]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <div className="mt-6">
              <AdminFormStepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit(onSubmit)}
                isSubmitting={false}
                isLastStep={currentStep === steps.length}
                isFirstStep={currentStep === 1}
                submitLabel="Edit Invoice"
                allowStepNavigation
              >
                <form>{renderStepContent()}</form>
              </AdminFormStepper>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
