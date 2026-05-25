import { useState, useRef } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import toast from 'react-hot-toast';

import { getErrorMessage } from '@/lib/get-error-message';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Map,
  Hash,
  Globe,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from '@/API/api';
import { AdminFormStepper } from '@/components/admin/admin-form-stepper';
import { AdminFormStep } from '@/components/admin/admin-form-step';
import { ReviewCard } from '@/components/admin/review-card';
import Loader from '@/components/loader';
import type { ICustomer } from '@/types';
import { validatePhone } from '@/lib/phone-validation';
import { validateAddress, getCountryIsoFromPhoneCode } from '@/lib/address-validation';

const editCustomerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^\d+$/, 'Phone number must be numeric'),
    countryCode: z.string().min(1, 'Country code is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z
      .string()
      .min(1, 'Postal code is required')
      .min(3)
      .max(10)
      .regex(/^\d+$/, 'Invalid postal code'),
    country: z.string().min(1, 'Country is required'),
    countryIso: z.string(),
    location: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    locationMode: z.enum(['map', 'manual']),
  })
  .superRefine((data, ctx) => {
    const phoneResult = validatePhone(data.phoneNumber, data.countryCode);
    if (!phoneResult.valid && phoneResult.error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: phoneResult.error,
        path: ['phoneNumber'],
      });
    }

    const iso = data.countryIso || getCountryIsoFromPhoneCode(data.countryCode) || '';
    if (iso && data.country) {
      const addrResult = validateAddress(iso, data.state, data.city, data.postalCode);
      if (!addrResult.valid && addrResult.error && addrResult.path) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: addrResult.error,
          path: [addrResult.path as any],
        });
      }
    }
  });

type EditCustomerFormData = z.infer<typeof editCustomerSchema>;

const steps = [
  {
    id: 1,
    title: 'Basic Info',
    description: 'Customer contact details',
    icon: null,
  },
  {
    id: 2,
    title: 'Location',
    description: 'Address information',
    icon: null,
  },
  {
    id: 3,
    title: 'Review',
    description: 'Verify details',
    icon: null,
  },
];

export default function CustomerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // if (!id) {
  //   return (
  //     <AppLayout>
  //       <div className="flex h-full items-center justify-center">
  //         <p className="text-muted-foreground">Invalid customer ID</p>
  //       </div>
  //     </AppLayout>
  //   );
  // }
  const location = useLocation();
  const passedCustomer = location.state?.customer as
    | ICustomer
    | undefined;

  const [currentStep, setCurrentStep] = useState(1);
  const [updateCustomer, { isLoading: isUpdating }] =
    useUpdateCustomerMutation();
  const formRef = useRef<HTMLFormElement>(null);

  const { data, isLoading: isLoadingCustomer } =
    useGetCustomerByIdQuery(id!, {
      skip: !id || !!passedCustomer,
    });
  // skip: !!passedCustomer,
  const customer = passedCustomer ?? (data as any)?.customer ?? data;

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditCustomerFormData>({
    mode: 'all',
    resolver: zodResolver(editCustomerSchema),
    values: customer
      ? {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          countryCode: customer.countryCode,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postalCode,
          country: customer.country,
          countryIso: (customer as any).countryIso || '',
          location: customer.location?.coordinates
            ? `${customer.location.coordinates[1]}, ${customer.location.coordinates[0]}`
            : '',
          latitude: customer.location?.coordinates?.[1] || 0,
          longitude: customer.location?.coordinates?.[0] || 0,
          locationMode:
            customer.location?.coordinates?.[0] &&
            customer.location?.coordinates?.[1]
              ? 'map'
              : 'manual',
        }
      : undefined,
  });

  const formValues = watch();

  const handleNext = async () => {
    let fieldsToValidate: (keyof EditCustomerFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
      ];
    }

    if (currentStep === 2) {
      fieldsToValidate = [
        'address',
        'city',
        'state',
        'postalCode',
        'country',
      ];
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

  const onSubmit = async (data: EditCustomerFormData) => {
    if (!id) {
      toast.error('Customer ID is missing');
      return;
    }

    try {
      await updateCustomer({
        id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        location: {
          type: 'Point',
          coordinates: [data.longitude, data.latitude],
        },
      }).unwrap();

      toast.success('Customer updated successfully');
      navigate(ROUTES.CUSTOMERS);
    } catch (error: any) {
      toast.error(
        getErrorMessage(error, 'Failed to update customer'),
      );
    }
  };

  if (isLoadingCustomer) {
    return (
      <AppLayout>
        <Loader />
      </AppLayout>
    );
  }

  if (!customer) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">Customer not found</p>
        </div>
      </AppLayout>
    );
  }

  const renderStepContent = () => {
    if (currentStep === 3) {
      return (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <ReviewCard sections={[
            {
              icon: <User className="h-5 w-5 text-white" />,
              title: 'Customer Information',
              subtitle: `${formValues.email} · ${formValues.countryCode} ${formValues.phoneNumber}`,
              fields: [
                { icon: <User className="h-3 w-3" />, label: 'First Name', value: formValues.firstName },
                { icon: <User className="h-3 w-3" />, label: 'Last Name', value: formValues.lastName },
                { icon: <Mail className="h-3 w-3" />, label: 'Email', value: formValues.email },
                { icon: <Phone className="h-3 w-3" />, label: 'Phone Number', value: `${formValues.countryCode} ${formValues.phoneNumber}` },
                { icon: <MapPin className="h-3 w-3" />, label: 'Address', value: formValues.address },
                { icon: <Building2 className="h-3 w-3" />, label: 'City', value: formValues.city },
                { icon: <Map className="h-3 w-3" />, label: 'State', value: formValues.state },
                { icon: <Hash className="h-3 w-3" />, label: 'Postal Code', value: formValues.postalCode },
                { icon: <Globe className="h-3 w-3" />, label: 'Country', value: formValues.country },
                ...(formValues.latitude != null && formValues.longitude != null
                  ? [
                      { icon: <Map className="h-3 w-3" />, label: 'Latitude', value: String(formValues.latitude) },
                      { icon: <Map className="h-3 w-3" />, label: 'Longitude', value: String(formValues.longitude) },
                    ]
                  : [{ icon: <Map className="h-3 w-3" />, label: 'Coordinates', value: 'Not provided' }]),
              ],
            },
          ]} />
        </form>
      );
    }

    return (
      <AdminFormStep
        step={currentStep}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
        trigger={trigger}
      />
    );
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto pl-10 p-5">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.CUSTOMERS)}
            className="mb-4 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>

          <Navbar
            title="Edit Customer"
            subtitle="Update customer account details"
            showWelcome={false}
          />

          <AdminFormStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isUpdating}
            isLastStep={currentStep === steps.length}
            isFirstStep={currentStep === 1}
            submitLabel="Save Changes"
            allowStepNavigation
            formRef={formRef}
          >
            {renderStepContent()}
          </AdminFormStepper>
        </div>
      </div>
    </AppLayout>
  );
}
