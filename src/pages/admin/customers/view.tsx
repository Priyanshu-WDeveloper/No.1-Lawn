import {
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  MoreVertical,
  Pencil,
  Wallet,
  PowerOff,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ROUTES } from '@/constants';
import {
  useGetCustomerByIdQuery,
  useToggleCustomerStatusMutation,
} from '@/API/api';
import type { ICustomer } from '@/types';
import Loader from '@/components/loader';
import toast from 'react-hot-toast';

import { getErrorMessage } from '@/lib/get-error-message';
import { formatDate } from '@/lib/format-date';
import { StatusBadge } from '@/components/data-table/status-badge';
import { STATUS_CONFIG } from '@/constants/status-config';

export default function CustomerViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">Invalid customer ID</p>
        </div>
      </AppLayout>
    );
  }
  const location = useLocation();
  const passedCustomer = location.state?.customer as
    | ICustomer
    | undefined;
  const [toggleCustomerStatus] = useToggleCustomerStatusMutation();

  const { data, isLoading } = useGetCustomerByIdQuery(id, {
    skip: !!passedCustomer,
  });

  const customer = passedCustomer ?? (data as any)?.customer ?? data;

  const handleStatusChange = async (
    status: 'active' | 'inactive',
  ) => {
    if (!customer) return;
    try {
      await toggleCustomerStatus({
        id: customer._id,
        status,
      }).unwrap();
      toast.success(`Customer set to ${status}`);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update status'));
    }
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // const _lat = customer?.location?.coordinates?.[1];
  // const _lng = customer?.location?.coordinates?.[0];

  if (isLoading) {
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

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto pl-10 p-5">
          <div className="mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(ROUTES.CUSTOMERS)}
              className="mb-4 text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Button>

            {/* Header Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec] mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 bg-primary text-white">
                    <AvatarFallback className="text-xl font-bold">
                      {getInitials(customer.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {customer.fullName}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      Customer ID: {customer.customerId}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-right">
                    <StatusBadge
                      status={customer.status}
                      config={STATUS_CONFIG.customer}
                    />

                    <div className="mt-2">
                      <span
                        className={`text-lg font-semibold ${
                          customer.balance < 0
                            ? 'text-red-500'
                            : 'text-primary'
                        }`}
                      >
                        {customer.balance < 0 ? '-' : ''}$
                        {Math.abs(customer.balance).toFixed(2)}
                      </span>

                      <p className="text-xs text-muted-foreground">Balance</p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-xl">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-52 rounded-2xl"
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(
                            ROUTES.CUSTOMERS_EDIT.replace(
                              ':id',
                              customer._id,
                            ),
                            { state: { customer } },
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Pencil className="mr-2 h-4 w-4 text-amber-500" />
                        Edit Customer
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          navigate(
                            `/customers/wallet/${customer._id}`,
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Wallet className="mr-2 h-4 w-4 text-primary" />
                        Wallet
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {customer.status === 'active' ? (
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() =>
                            handleStatusChange('inactive')
                          }
                        >
                          <PowerOff className="mr-2 h-4 w-4 text-red-500 focus:text-red-500" />
                          Set Inactive
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="text-primary focus:text-primary"
                          onClick={() => handleStatusChange('active')}
                        >
                          <Pencil className="mr-2 h-4 w-4 text-amber-500" />
                          Set Active
                        </DropdownMenuItem>
                      )}
                      {/* <DropdownMenuItem
                        onClick={() =>
                          console.log(
                            'Delete customer:',
                            customer._id,
                          )
                        }
                        className="cursor-pointer text-red-500 focus:text-red-500"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Customer
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Contact Information Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Contact Information
                  </h3>
                </div>
                <div className="space-y-4">
                  {/* <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="text-foreground font-medium">
                        {customer.fullName}
                      </p>
                    </div>
                  </div> */}
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">
                        {customer.countryCode} {customer.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Summary Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec] ">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Account Summary
                  </h3>
                </div>
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> */}
                <div className="space-y-4">
                  {/* <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <StatusBadge
                      status={customer.status}
                      config={STATUS_CONFIG.customer}
                    />
                  </div> */}
                  {/* <div>
                    <p className="text-sm text-muted-foreground">Managed By</p>
                    <p className="text-foreground font-medium mt-1">
                      {customer.parentAdmin || '-'}
                    </p>
                  </div> */}
                  <div>
                    <p className="text-sm text-muted-foreground">Created At</p>
                    <p className="text-foreground font-medium mt-1">
                      {formatDate(customer.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="text-foreground font-medium mt-1">
                      {formatDate(customer.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Details Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec] md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Address Details
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Street Address
                      </p>
                      <p className="text-foreground font-medium">
                        {customer.address || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="text-foreground font-medium">
                        {customer.city || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="text-foreground font-medium">
                        {customer.state || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Postal Code
                      </p>
                      <p className="text-foreground font-medium">
                        {customer.postalCode || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="text-foreground font-medium">
                        {customer.country || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Embedded Google Map */}
                  {/* {lat && lng && (
                    <StaticMap lat={lat} lng={lng} height={250} />
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
