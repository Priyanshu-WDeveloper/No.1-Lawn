export * from './employees.types';
export * from './customers.types';
export * from './common.types';

// Job types
export interface IJob {
  _id: string;
  customer: string;
  employee: string;
  address: string;
  jobType: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  paymentType: string;
}

// Invoice types
export interface IInvoice {
  _id: string;
  invoiceNumber: string;
  customer: string;
  jobId: string;
  totalAmount: number;
  receivedAmount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

// Admin User types (for Super Admin)
export interface IAdminUser {
  _id: string;
  adminId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive' | 'expired';
  profileImage: string;
  countryCode: string;
  phoneNumber: string;
  role: number;
  city: string;
  address: string;
  state: string;
  postalCode: string;
  country: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: string;
  updatedAt: string;
  validity?: string;
}
