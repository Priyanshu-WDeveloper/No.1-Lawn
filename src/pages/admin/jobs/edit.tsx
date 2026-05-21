import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  Users,
  MapPin,
  Calendar,
  CreditCard,
  ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { AppLayout } from '@/components/layout/app-layout';
import { Navbar } from '@/components/layout/navbar';
import { ROUTES } from '@/constants';
import { AdminFormStepper } from '../../../components/admin/admin-form-stepper';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { LocationModeToggle } from '@/components/forms/location-mode-toggle';
import { MockMapPicker } from '@/components/forms/mock-map-picker';
import { ManualCoordinates } from '@/components/forms/manual-coordinates';
import { Check } from 'lucide-react';

const editJobSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  employee: z.string().min(1, 'Employee is required'),
  jobAddress: z.string().min(1, 'Job address is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  locationMode: z.enum(['map', 'manual']),
  jobType: z.string().min(1, 'Job type is required'),
  jobDate: z.string().min(1, 'Job date is required'),
  frequencyValue: z.number().optional(),
  frequencyUnit: z.string().optional(),
  paymentType: z.string().min(1, 'Payment type is required'),
  notes: z.string().optional(),
});

type EditJobFormData = z.infer<typeof editJobSchema>;

const steps = [
  {
    id: 1,
    title: 'Assignment',
    description: 'Customer & Employee',
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: 2,
    title: 'Location',
    description: 'Job address',
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: 3,
    title: 'Schedule',
    description: 'Type & frequency',
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 4,
    title: 'Payment',
    description: 'Payment details',
    icon: <CreditCard className="h-4 w-4" />,
  },
];

function ReviewCard({ formData }: { formData: EditJobFormData }) {
  return (
    <div className="rounded-xl border border-dashed border-[#e5e5e5] bg-[#fafaf8] p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf8e7]">
          <Check className="h-6 w-6 text-[#16610E]" />
        </div>
        <h5 className="mb-2 text-lg font-semibold text-[#151515]">
          Review Job Information
        </h5>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <Users className="h-4 w-4" />
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
            <Users className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Employee</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.employee || 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Address</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.jobAddress || 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Job Type</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.jobType || 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <CreditCard className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Payment</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.paymentType || 'Not provided'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#777]">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Date</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#151515]">
              {formData.jobDate || 'Not provided'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditJobPage() {
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
  } = useForm<EditJobFormData>({
    resolver: zodResolver(editJobSchema),
    defaultValues: {
      customer: 'cust-1',
      employee: 'emp-1',
      jobAddress: '383A Richardson Road Mount Roskill',
      latitude: -36.909,
      longitude: 174.731,
      locationMode: 'map',
      jobType: 'recurring',
      jobDate: '2026-05-14',
      frequencyValue: 2,
      frequencyUnit: 'week',
      paymentType: 'bank-transfer',
      notes: 'Customer requested weekend servicing only.',
    },
  });

  const formValues = watch();

  const handleNext = async () => {
    let fieldsToValidate: (keyof EditJobFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['customer', 'employee'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['jobAddress'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['jobType', 'jobDate'];
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

  const onSubmit = (data: EditJobFormData) => {
    console.log('Updating job:', data);
    toast.success('Job updated successfully');
    navigate(ROUTES.JOBS_VIEW.replace(':id', id!));
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#777]">
              Job Assignment
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
                  Select Employee
                  <span className="text-[#16610E]"> *</span>
                </label>
                <Select
                  value={formValues.employee || ''}
                  onValueChange={(v) => setValue('employee', v)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]">
                    <SelectValue placeholder="Choose an employee" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="emp-1">
                      Sarah Miller
                    </SelectItem>
                    <SelectItem value="emp-2">Aman Sharma</SelectItem>
                    <SelectItem value="emp-3">John Smith</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employee && (
                  <p className="text-sm text-red-500">
                    {errors.employee.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#777]">
              Job Location
            </h4>
            <div className="space-y-5">
              <LocationModeToggle
                value={formValues.locationMode || 'map'}
                onChange={(mode) => setValue('locationMode', mode)}
              />

              {formValues.locationMode === 'map' ? (
                <MockMapPicker
                  latitude={formValues.latitude || 0}
                  longitude={formValues.longitude || 0}
                  onPick={(lat, lng) => {
                    setValue('latitude', lat);
                    setValue('longitude', lng);
                  }}
                />
              ) : (
                <ManualCoordinates
                  latitude={formValues.latitude || 0}
                  longitude={formValues.longitude || 0}
                  onChange={(lat, lng) => {
                    setValue('latitude', lat);
                    setValue('longitude', lng);
                  }}
                />
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#151515]">
                  Job Address
                  <span className="text-[#16610E]"> *</span>
                </label>
                <Textarea
                  placeholder="Enter job address"
                  {...register('jobAddress')}
                  className="min-h-[80px] rounded-xl border-[#e5e5e5] bg-[#fafaf8] p-4"
                />
                {errors.jobAddress && (
                  <p className="text-sm text-red-500">
                    {errors.jobAddress.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#777]">
              Job Schedule
            </h4>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#151515]">
                  Job Type
                  <span className="text-[#16610E]"> *</span>
                </label>
                <Select
                  value={formValues.jobType || ''}
                  onValueChange={(v) => setValue('jobType', v)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="one-time">One Time</SelectItem>
                    <SelectItem value="recurring">
                      Recurring
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-sm text-red-500">
                    {errors.jobType.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#151515]">
                  Job Date
                  <span className="text-[#16610E]"> *</span>
                </label>
                <Input
                  type="date"
                  {...register('jobDate')}
                  className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
                />
                {errors.jobDate && (
                  <p className="text-sm text-red-500">
                    {errors.jobDate.message}
                  </p>
                )}
              </div>

              {formValues.jobType === 'recurring' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#151515]">
                      Frequency Value
                    </label>
                    <Input
                      type="number"
                      min={1}
                      {...register('frequencyValue', {
                        valueAsNumber: true,
                      })}
                      className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#151515]">
                      Frequency Unit
                    </label>
                    <Select
                      value={formValues.frequencyUnit || ''}
                      onValueChange={(v) =>
                        setValue('frequencyUnit', v)
                      }
                    >
                      <SelectTrigger className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#777]">
            Payment & Notes
          </h4>
          <div className="space-y-5">
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
                  <SelectItem value="drop-invoice">
                    Drop Invoice
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentType && (
                <p className="text-sm text-red-500">
                  {errors.paymentType.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
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
              title="Edit Job"
              subtitle="Update job details and assignment."
              showWelcome={false}
            />

            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  navigate(ROUTES.JOBS_VIEW.replace(':id', id!))
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
                submitLabel="Edit Job"
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
