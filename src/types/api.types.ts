import type { ICustomer, IJob, IInvoice } from '.';
import type { IAdmins } from './admins.types';

export type GetAdminsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: 'a_z' | 'z_a' | 'newest' | 'oldest';
};

export type GetAdminsResponse = {
  admins: IAdmins[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export interface GetCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'expired';
  active?: boolean;
  sort?: 'a_z' | 'z_a' | 'newest' | 'oldest';
}

export interface CustomersResponse {
  customers: ICustomer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface CustomerMutationResponse {
  message: string;
  customer: ICustomer;
}
export interface JobsResponse {
  jobs: IJob[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InvoicesResponse {
  invoices: IInvoice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
}
