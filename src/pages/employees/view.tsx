import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface EmployeeData {
  employeeId: string;
  name: string;
  address: string;
  contact: {
    email: string;
    phone: string;
  };
  status: string;
  documents: string[];
}

const mockEmployee: EmployeeData = {
  employeeId: 'EMP-001',
  name: 'Sarah Miller',
  address: 'Auckland, New Zealand',
  contact: {
    email: 'sarah.m@clovant.com',
    phone: '+64-XX-XXX-XXXX',
  },
  status: 'Active',
  documents: ['img'],
};

export default function EmployeeViewPage() {
  const { id: _id } = useParams();
  const navigate = useNavigate();

  const employee = mockEmployee;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto p-10">
          <div className="mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/employees')}
              className="mb-4 text-[#777] hover:text-[#16610E] hover:bg-[#edf8e7]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Employees
            </Button>

            {/* Header Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec] mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 bg-[#16610E] text-white">
                    <AvatarFallback className="text-xl font-bold">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold text-[#151515]">
                        {employee.name}
                      </h1>
                      <Badge className="bg-[#16610E] text-white">
                        {employee.employeeId}
                      </Badge>
                    </div>
                    <p className="text-[#777] text-sm mt-1">
                      Employee Details
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${employee.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'} border px-3 py-1`}
                >
                  {employee.status}
                </Badge>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Details Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-[#edf8e7] flex items-center justify-center">
                    <User className="h-4 w-4 text-[#16610E]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#151515]">
                    Personal Details
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f8f8f5] flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#151515]">
                        ID
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-[#777]">
                        Employee ID
                      </p>
                      <p className="text-[#151515] font-medium">
                        {employee.employeeId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-[#777]" />
                    <div>
                      <p className="text-sm text-[#777]">Full Name</p>
                      <p className="text-[#151515] font-medium">
                        {employee.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#777]" />
                    <div>
                      <p className="text-sm text-[#777]">Address</p>
                      <p className="text-[#151515] font-medium">
                        {employee.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-[#edf8e7] flex items-center justify-center">
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
                        {employee.contact.email}
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
                        {employee.contact.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Status Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ececec] md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-[#edf8e7] flex items-center justify-center">
                    <FileText className="h-4 w-4 text-[#16610E]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#151515]">
                    Employment Status
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-[#777]">
                      Current Status
                    </p>
                    <Badge
                      className={`mt-2 ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-[#777]">Documents</p>
                    <div className="mt-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#16610E]" />
                      <span className="text-[#151515] font-medium">
                        {employee.documents.length}{' '}
                        {employee.documents.length === 1
                          ? 'file'
                          : 'files'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[#777]">
                      Employee Type
                    </p>
                    <p className="text-[#151515] font-medium mt-2">
                      Full-time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
