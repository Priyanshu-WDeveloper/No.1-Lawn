import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  Users,
  MapPin,
  Calendar,
  CreditCard,
  ArrowLeft,
  DollarSign,
  FileText,
} from 'lucide-react';
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
import { LocationModeToggle } from '@/components/forms/location-mode-toggle';
import { MockMapPicker } from '@/components/forms/mock-map-picker';
import { ManualCoordinates } from '@/components/forms/manual-coordinates';
import { Check } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { useCreateJobMutation, useGetCustomersQuery, useGetEmployeesQuery } from '@/API/api';
import { getErrorMessage } from '@/lib/get-error-message';

const createJobSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  employee: z.string().optional(),
  jobAddress: z.string().min(1, 'Job address is required'),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  locationMode: z.enum(['map', 'manual']),
  jobType: z.string().min(1, 'Job type is required'),
  jobDate: z.string().min(1, 'Job date is required'),
  frequencyValue: z.number().optional(),
  frequencyUnit: z.string().optional(),
  price: z.number().min(0, 'Price must be at least 0').optional(),
  paymentType: z.string().min(1, 'Payment type is required'),
  description: z.string().optional(),
  notes: z.string().optional(),
});

type CreateJobFormData = z.infer<typeof createJobSchema>;

const initialFormData: CreateJobFormData = {
  customer: '',
  employee: '',
  jobAddress: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  latitude: undefined,
  longitude: undefined,
  locationMode: 'map',
  jobType: '',
  frequencyValue: 1,
  frequencyUnit: 'week',
  price: undefined,
  paymentType: '',
  jobDate: '',
  description: '',
  notes: '',
};

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

function ReviewCard({
  formData,
  customerName,
  employeeName,
}: {
  formData: CreateJobFormData;
  customerName: string;
  employeeName: string;
}) {
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
              {customerName}
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
              {employeeName}
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
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#777]">Description</p>
          </div>
          <div className="text-right max-w-[200px]">
            <p className="text-sm font-medium text-[#151515] truncate">
              {formData.description || 'Not provided'}
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

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();

  const { data: customersData } = useGetCustomersQuery({ limit: 500, page: 1 });
  const { data: employeesData } = useGetEmployeesQuery({ limit: 500, page: 1 });

  const customerOptions = useMemo(
    () =>
      (customersData?.customers ?? []).map((c) => ({
        _id: c._id,
        label: c.fullName,
        subtitle: c.email,
      })),
    [customersData],
  );

  const employeeOptions = useMemo(
    () =>
      (employeesData?.employees ?? []).map((e) => ({
        _id: e._id,
        label: e.fullName,
        subtitle: e.email,
      })),
    [employeesData],
  );

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: initialFormData,
  });

  const formValues = watch();

  const handleNext = async () => {
    let fieldsToValidate: (keyof CreateJobFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['customer'];
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

  const onSubmit = async (data: CreateJobFormData) => {
    try {
      const payload: Record<string, unknown> = {
        customerId: data.customer,
        address: data.jobAddress,
        city: data.city || undefined,
        state: data.state || undefined,
        country: data.country || undefined,
        postalCode: data.postalCode || undefined,
        jobType: data.jobType.replace('-', '_'),
        jobDate: new Date(data.jobDate).toISOString(),
        paymentType: data.paymentType.replace('-', '_'),
        price: data.price || undefined,
        description: data.description || undefined,
        notes: data.notes || undefined,
        location:
          data.latitude && data.longitude
            ? ({
                type: 'Point' as const,
                coordinates: [data.longitude, data.latitude] as [number, number],
              } as const)
            : undefined,
        frequency:
          data.jobType === 'recurring' &&
          data.frequencyValue &&
          data.frequencyUnit
            ? {
                value: data.frequencyValue,
                unit: data.frequencyUnit,
              }
            : undefined,
      };
      if (data.employee) {
        payload.employeeId = data.employee;
      }
      await createJob(payload).unwrap();
      toast.success('Job created successfully');
      navigate(ROUTES.JOBS);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to create job'));
    }
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
                <SearchableSelect
                  data={customerOptions}
                  value={formValues.customer || ''}
                  onChange={(v) => setValue('customer', v)}
                  placeholder="Choose a customer"
                  searchPlaceholder="Search customers..."
                  loading={!customersData}
                  error={errors.customer?.message}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#151515]">
                  Select Employee
                  <span className="text-[#9ca3af] text-xs ml-1">(Optional)</span>
                </label>
                <SearchableSelect
                  data={employeeOptions}
                  value={formValues.employee || ''}
                  onChange={(v) => setValue('employee', v)}
                  placeholder="Choose an employee"
                  searchPlaceholder="Search employees..."
                  loading={!employeesData}
                />
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">City</label>
                  <Input
                    placeholder="Enter city"
                    {...register('city')}
                    className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">State</label>
                  <Input
                    placeholder="Enter state"
                    {...register('state')}
                    className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">Country</label>
                  <Input
                    placeholder="Enter country"
                    {...register('country')}
                    className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">Postal Code</label>
                  <Input
                    placeholder="Enter postal code"
                    {...register('postalCode')}
                    className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8]"
                  />
                </div>
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  Price
                  <span className="text-[#16610E]"> *</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="0.00"
                    {...register('price', { valueAsNumber: true })}
                    className="h-12 rounded-xl border-[#e5e5e5] bg-[#fafaf8] pl-10"
                  />
                </div>
                {errors.price && (
                  <p className="text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#151515]">
                Description
              </label>
              <Textarea
                placeholder="Enter job description..."
                {...register('description')}
                className="min-h-[80px] rounded-xl border-[#e5e5e5] bg-[#fafaf8] p-4"
              />
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

        <ReviewCard
          formData={formValues}
          customerName={
            customerOptions.find((c) => c._id === formValues.customer)
              ?.label || formValues.customer || 'Not provided'
          }
          employeeName={
            employeeOptions.find((e) => e._id === formValues.employee)
              ?.label || 'Not assigned'
          }
        />
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto px-4 py-5">
          <div className="flex w-full flex-col">
            <Navbar
              title="Create Job"
              subtitle="Schedule a new job and assign customer & employee."
              showWelcome={false}
            />

            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate(ROUTES.JOBS)}
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
                isSubmitting={isCreating}
                isLastStep={currentStep === steps.length}
                isFirstStep={currentStep === 1}
                submitLabel="Create Job"
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
