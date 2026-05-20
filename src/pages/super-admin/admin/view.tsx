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
  User,
  Pencil,
  Ellipsis,
} from 'lucide-react';
import { SuperAdminLayout } from '@/components/layout/SuperAdminLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ActionButton } from '../../../components/data-table/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import {
  useGetAdminUserByIdQuery,
  useUpdateAdminUserMutation,
} from '../../../API/api';
import { ROUTES } from '@/constants';
import Loader from '../../../components/loader';
import type { IAdmins } from '../../../types/admins.types';
import toast from 'react-hot-toast';

export default function AdminViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const passedAdmin = location.state?.admin as IAdmins | undefined;
  const [updateAdminUser] = useUpdateAdminUserMutation();

  const { data, isLoading, refetch } = useGetAdminUserByIdQuery(id, {
    skip: !!passedAdmin,
  });

  const admin = passedAdmin ?? data?.admin;

  const handleStatusChange = async (
    id: string,
    status: 'active' | 'inactive',
  ) => {
    try {
      const res = await updateAdminUser({ id, status }).unwrap();
      console.log(
        '\n===================== 🟢 res =====================',
      );
      console.log(res);
      console.log(
        '=================================================\n',
      );
      refetch();
      toast.success(`Admin set to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <SuperAdminLayout>
        <Loader />
      </SuperAdminLayout>
    );
  }

  if (!admin) {
    return (
      <SuperAdminLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-[#777]">Admin not found</p>
        </div>
      </SuperAdminLayout>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700 border-green-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    expired: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <SuperAdminLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto pl-10 p-5">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.SUPER_ADMIN_ADMINS)}
            className="mb-4 text-[#777] hover:text-[#16610E] hover:bg-[#edf8e7]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admins
          </Button>

          <div className="mb-6 rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-[#16610E] text-white">
                  <AvatarFallback className="text-xl font-bold">
                    {getInitials(admin.firstName, admin.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-[#151515]">
                      {admin.firstName} {admin.lastName}
                    </h1>

                    {/* <Badge className="bg-[#16610E] text-white">
                      {admin.adminId}
                    </Badge> */}
                  </div>
                  {/* <p className="text-[#777] text-sm mt-1">
                    Admin Details
                  </p> */}
                  <Badge
                    className={`${statusColors[admin.status] || statusColors.inactive} border px-3 py-1`}
                  >
                    {admin.status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <ActionButton
                  icon={<Pencil className="h-3.5 w-3.5" />}
                  className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] shadow-none"
                  onClick={() =>
                    navigate(
                      ROUTES.ADMIN_EDIT.replace(':id', admin._id),
                      {
                        state: { admin },
                      },
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
                        toast.success(
                          'Login as Admin — frontend only',
                        );
                      }}
                      className="truncate"
                    >
                      Login as Admin
                    </DropdownMenuItem>
                    {admin.status === 'active' ? (
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500"
                        onClick={() =>
                          handleStatusChange(admin._id, 'inactive')
                        }
                      >
                        Set Inactive
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className="text-green-600 focus:text-green-600"
                        onClick={() =>
                          handleStatusChange(admin._id, 'active')
                        }
                      >
                        Set Active
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => {
                        toast.success(
                          'Change Password — frontend only',
                        );
                      }}
                      className="truncate"
                    >
                      Change Password
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf8e7]">
                  <User className="h-4 w-4 text-[#16610E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#151515]">
                  Personal Details
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8f8f5]">
                    <span className="text-xs font-semibold text-[#151515]">
                      ID
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#777]">Admin ID</p>
                    <p className="text-[#151515] font-medium">
                      {admin.adminId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-[#777]" />
                  <div>
                    <p className="text-sm text-[#777]">Full Name</p>
                    <p className="text-[#151515] font-medium">
                      {admin.firstName} {admin.lastName}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-[#777]" />
                  <div>
                    <p className="text-sm text-[#777]">Role</p>
                    <p className="text-[#151515] font-medium">
                      {admin.role === 1 ? 'Super Admin' : 'Admin'}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf8e7]">
                  <Mail className="h-4 w-4 text-[#16610E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#151515]">
                  Contact Information
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#777]" />
                  <div>
                    <p className="text-sm text-[#777]">
                      Email Address
                    </p>
                    <p className="text-[#151515] font-medium">
                      {admin.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#777]" />
                  <div>
                    <p className="text-sm text-[#777]">
                      Phone Number
                    </p>
                    <p className="text-[#151515] font-medium">
                      {admin.countryCode} {admin.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm md:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf8e7]">
                  <MapPin className="h-4 w-4 text-[#16610E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#151515]">
                  Address
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#777]">Address</p>
                  <p className="text-[#151515] font-medium mt-1">
                    {admin.address || '-'}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-[#777]">City</p>
                    <p className="text-[#151515] font-medium mt-1">
                      {admin.city || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#777]">State</p>
                    <p className="text-[#151515] font-medium mt-1">
                      {admin.state || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#777]">Postal Code</p>
                    <p className="text-[#151515] font-medium mt-1">
                      {admin.postalCode || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#777]">Country</p>
                    <p className="text-[#151515] font-medium mt-1">
                      {admin.country || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
