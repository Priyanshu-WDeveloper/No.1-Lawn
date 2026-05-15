// Removed unused imports: React, Button, Card, Input, Select
// import * as React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Eye, LucideTrash2, Pencil } from 'lucide-react';

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

// Define the structure for Customer data
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: 'Active' | 'Inactive';
  balance: number;
}

// Sample Customer Data
const customers: Customer[] = [
  {
    id: 'CUST-0001',
    name: 'Babu Kondepudi',
    email: 'babu_kondepudi@yahoo.co.nz',
    phone: '0211470500',
    city: '-',
    status: 'Active',
    balance: -80.5,
  },
  {
    id: 'CUST-0002',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0211234567',
    city: 'Auckland',
    status: 'Active',
    balance: 120.75,
  },
  {
    id: 'CUST-0003',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '0227654321',
    city: 'Wellington',
    status: 'Inactive',
    balance: 0.0,
  },
  {
    id: 'CUST-0004',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '0219988776',
    city: 'Christchurch',
    status: 'Active',
    balance: 45.5,
  },
  {
    id: 'CUST-0005',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '0213344556',
    city: 'Hamilton',
    status: 'Active',
    balance: 10.0,
  },
];

// Main Customer Management Page Component
export default function CustomerManagementPage() {
  const navigate = useNavigate();

  // Define columns inside component to access navigate
  const customerColumns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'id',
      header: 'Customer ID',
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
      accessorKey: 'city',
      header: 'City',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      filterField: 'status',
      filterOptions: ['Active', 'Inactive'],
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: (row: Customer) => (
        <span
          className={
            row.balance < 0 ? 'text-red-500' : 'text-green-600'
          }
        >
          ${row.balance.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (row: Customer) => (
        //       <div className="flex flex-wrap gap-2">
        //         <ActionButton
        //           icon={<Eye className="h-4 w-4" />}
        //           onClick={() => navigate(`/customers/${row.id}`)}
        //         />
        //         <ActionButton
        //           icon={<Pencil className="h-4 w-4" />}
        //           onClick={() => console.log('Edit customer:', row.id)}
        //         />
        //         {/* <ActionButton
        //           className="hover:text-white hover:bg-red-600"
        //           icon={<LucideTrash2 className="h-3 w-3" />}
        //           onClick={() =>
        //             console.log('Deleting access for job ID:', row.id)
        //           }
        //         /> */}
        //         <ActionButton
        //           variant="outline"
        //           className="
        //   group
        //   h-9 w-9
        //   rounded-full
        //   border border-red-100
        //   bg-red-50/60
        //   text-red-500
        //   transition-all duration-200
        //   hover:scale-105
        //   hover:border-red-500
        //   hover:bg-red-600
        //   hover:text-white
        //   hover:shadow-lg hover:shadow-red-200
        //   active:scale-95
        // "
        //           icon={
        //             <LucideTrash2
        //               className="
        //       h-4 w-4
        //       transition-transform duration-200
        //       group-hover:rotate-6
        //       group-hover:scale-110
        //     "
        //             />
        //           }
        //           onClick={() =>
        //             console.log('Deleting access for job ID:', row.id)
        //           }
        //         />
        //       </div>
        <div className="flex flex-wrap gap-2">
          <ActionButton
            intent="view"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => navigate(`/customers/${row.id}`)}
          />

          <ActionButton
            intent="edit"
            icon={<Pencil className="h-4 w-4" />}
            onClick={() => console.log('Edit customer:', row.id)}
          />

          <ActionButton
            intent="delete"
            icon={<LucideTrash2 className="h-4 w-4" />}
            onClick={() =>
              console.log('Deleting access for job ID:', row.id)
            }
          />
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      {/* <main className="flex-1 w-full overflow-y-auto px-4 pt-9 pb-9"> */}
      {/* <main className="flex-1 h-[90vh] border border-blue-600 w-full overflow-y-auto px-4 pt-5 pb-5">
        <div className="min-h-full w-full h-[90vh] border border-blue-600"> */}
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto px-4 py-5">
          <div className="flex w-full flex-col">
            <Navbar
              title="Customer Management"
              subtitle="Manage your customers and view their details."
              showWelcome={false}
            />

            <DataTable<Customer>
              data={customers}
              columns={customerColumns}
              title="Customers"
              description="Manage all your customers in one place."
              searchPlaceholder="Search customers..."
              filterField="status"
              filterOptions={['Active', 'Inactive']}
              addButtonLabel="Add Customer"
              onAddClick={() => navigate('/customers/create')}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
