import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  FileText,
  File,
  Image,
  Eye,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useGetEmployeeByIdQuery } from '@/API/api';
import { ROUTES } from '@/constants';

interface EmployeeDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface Employee {
  id: string;
  employeeId?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  contact?: {
    email: string;
    phone: string;
  };
  status: 'Active' | 'Inactive';
  documents?: EmployeeDocument[];
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) {
    return <Image className="h-5 w-5 text-blue-500" />;
  }
  if (type === 'application/pdf') {
    return <FileText className="h-5 w-5 text-red-500" />;
  }
  return <File className="h-5 w-5 text-gray-500" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const mockEmployeeData: Employee = {
  id: 'EMP-001',
  employeeId: 'EMP-001',
  name: 'Sarah Miller',
  email: 'sarah.m@clovant.com',
  phone: '+64-21-123-4567',
  address: 'Auckland, New Zealand',
  contact: {
    email: 'sarah.m@clovant.com',
    phone: '+64-21-123-4567',
  },
  status: 'Active',
  documents: [
    {
      id: 'doc-1',
      name: 'resume.pdf',
      type: 'application/pdf',
      size: 245000,
      url: '#',
    },
    {
      id: 'doc-2',
      name: 'profile-photo.jpg',
      type: 'image/jpeg',
      size: 125000,
      url: '#',
    },
    {
      id: 'doc-3',
      name: 'contract.pdf',
      type: 'application/pdf',
      size: 180000,
      url: '#',
    },
  ],
};

export default function EmployeeViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apiEmployee, isLoading } = useGetEmployeeByIdQuery(
    id,
    { skip: !id },
  );

  const employee = (apiEmployee as Employee) || mockEmployeeData;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
  };

  const openDocument = (doc: EmployeeDocument) => {
    if (doc.url && doc.url !== '#') {
      window.open(doc.url, '_blank');
    }
  };

  const displayDocuments = employee.documents || [];
  const displayContact = employee.contact || {
    email: employee.email,
    phone: employee.phone,
  };

  return (
    <AppLayout>
      <main className="flex-1 w-full overflow-y-auto p-10">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.EMPLOYEES)}
            className="mb-6 text-[#6b7280] hover:text-[#151515]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Employees
          </Button>

          {isLoading ? (
            <div className="text-center py-12 text-[#6b7280]">
              Loading employee details...
            </div>
          ) : (
            <>
              {/* Header Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#f3f4f6] p-8 mb-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl bg-[#edf8e7] text-[#16610E]">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-[#151515]">
                        {employee.name}
                      </h1>
                      <Badge
                        className={
                          employee.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {employee.status}
                      </Badge>
                    </div>

                    <p className="text-[#6b7280] text-sm">
                      Employee ID: {employee.employeeId || employee.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#f3f4f6] p-8 mb-6">
                <h2 className="text-lg font-semibold text-[#151515] mb-6">
                  Contact Information
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#edf8e7] flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#16610E]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280]">Email</p>
                      <p className="text-sm font-medium text-[#151515]">
                        {displayContact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#edf8e7] flex items-center justify-center">
                      <Phone className="h-5 w-5 text-[#16610E]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280]">Phone</p>
                      <p className="text-sm font-medium text-[#151515]">
                        {displayContact.phone}
                      </p>
                    </div>
                  </div>

                  {employee.address && (
                    <div className="flex items-center gap-3 md:col-span-2">
                      <div className="h-10 w-10 rounded-xl bg-[#edf8e7] flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-[#16610E]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6b7280]">Address</p>
                        <p className="text-sm font-medium text-[#151515]">
                          {employee.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              {displayDocuments.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-[#f3f4f6] p-8">
                  <h2 className="text-lg font-semibold text-[#151515] mb-6">
                    Documents
                  </h2>

                  <div className="space-y-3">
                    {displayDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-[#f3f4f6] hover:border-[#e5e7eb] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <p className="text-sm font-medium text-[#151515]">
                              {doc.name}
                            </p>
                            <p className="text-xs text-[#6b7280]">
                              {formatFileSize(doc.size)}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDocument(doc)}
                          className="h-8 w-8 text-[#6b7280] hover:text-[#16610E]"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </AppLayout>
  );
}
