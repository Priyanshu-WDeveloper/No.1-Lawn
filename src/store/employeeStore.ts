import { create } from 'zustand';

export interface EmployeeDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: 'Active' | 'Inactive';
  documents: EmployeeDocument[];
  role?: string;
  department?: string;
  contact?: {
    email: string;
    phone: string;
  };
  employeeId?: string;
}

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  getEmployee: (id: string) => Employee | undefined;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: [],
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
  getEmployee: (id) => get().employees.find((e) => e.id === id),
  updateEmployee: (id, data) =>
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    })),
}));