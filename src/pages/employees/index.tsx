// Removed unused imports: React, Button, Card, Input, Select
// import * as React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  Eye,
  Pencil,
} from 'lucide-react';

// Corrected import for DataTable and its types
// Using type-only import for ColumnDef due to verbatimModuleSyntax
import type { ColumnDef } from '@/components/data-table/DataTable';
// Removed DataTableData from import as it's unused
import DataTable, {
  ActionButton,
} from '@/components/data-table/DataTable'; // ActionButton is now imported directly from DataTable
import { AppLayout } from '@/components/layout/AppLayout';
import { Navbar } from '@/components/layout/Navbar';
import { useNavigate } from 'react-router-dom';

// Define the structure for Employee data
interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
}

// Sample Employee Data
const employees: Employee[] = [
  {
    id: 'EMP-001',
    name: 'Aman Sharma',
    email: 'aman.sharma@example.com',
    phone: '0211111111',
    role: 'Software Engineer',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 'EMP-002',
    name: 'Babu Kondepudi',
    email: 'babu_kondepudi@yahoo.co.nz',
    phone: '0211470500',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
  },
  {
    id: 'EMP-003',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '0227654321',
    role: 'UX Designer',
    department: 'Design',
    status: 'Inactive',
  },
  {
    id: 'EMP-004',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '0219988776',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 'EMP-004',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '0219988776',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Active',
  },
];

// Main Employee Management Page Component
export default function EmployeeManagementPage() {
  const navigate = useNavigate();

  // Define columns inside component to access navigate
  const employeeColumns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'id',
      header: 'Employee ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      filterField: 'status',
      filterOptions: ['Active', 'Inactive'],
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (row: Employee) => (
        <div className="flex flex-wrap gap-2">
          <ActionButton
            intent="view"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => navigate(`/employees/${row.id}`)}
          />
          <ActionButton
            intent="edit"
            icon={<Pencil className="h-4 w-4" />}
            onClick={() => console.log('Edit employee:', row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      {/* <main className="flex-1 w-full overflow-y-auto px-4 pt-9 pb-9"> */}
      <main className="flex-1 w-full overflow-y-auto px-4 pt-5 pb-5">
        <div className="min-h-full w-full">
          <Navbar
            title="Employee Management"
            subtitle="Manage your employees and view their details."
            showWelcome={false}
          />

          <DataTable<Employee>
            data={employees}
            columns={employeeColumns}
            title="Employees"
            description="Manage all your employees in one place."
            searchPlaceholder="Search employees..."
            filterField="status"
            filterOptions={['Active', 'Inactive']}
            addButtonLabel="Add Employee"
            onAddClick={() => navigate('/employees/create')}
          />
        </div>
      </main>
    </AppLayout>
  );
}
