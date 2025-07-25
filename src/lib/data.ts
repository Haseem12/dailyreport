
import type { StockReport, AdminUser, Department, ProductStock } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory data stores
let reports: StockReport[] = [
    {
    id: 'REP001',
    salesAgentName: 'John Doe',
    customerName: 'Shoprite Lekki',
    customerAddress: '123 Admiralty Way, Lekki, Lagos',
    supplyDate: new Date('2024-07-15'),
    dateOfVisit: new Date('2024-07-20'),
    batchNumber: 'B012345',
    expiryDate: new Date('2025-06-30'),
    productCondition: 'Good',
    outstandingBalance: 150000,
    products: [
      { id: 'PROD01', productName: 'Indomie Noodles', quantityRemaining: 50, remarks: 'Stock running low', action: 'Reorder' },
      { id: 'PROD02', productName: 'Dangote Sugar', quantityRemaining: 120, remarks: 'Sufficient stock', action: 'Monitor' },
      { id: 'PROD03', productName: 'Peak Milk', quantityRemaining: 5, remarks: 'Almost out of stock', action: 'Urgent Reorder' },
    ],
  },
  {
    id: 'REP002',
    salesAgentName: 'Jane Smith',
    customerName: 'Ebeano Supermarket',
    customerAddress: '456 Chevron Drive, Lekki, Lagos',
    supplyDate: new Date('2024-07-16'),
    dateOfVisit: new Date('2024-07-21'),
    batchNumber: 'B067890',
    expiryDate: new Date('2025-08-15'),
    productCondition: 'Good',
    outstandingBalance: 75000,
    products: [
      { id: 'PROD01', productName: 'Indomie Noodles', quantityRemaining: 200, remarks: 'Overstocked', action: 'Promotional Sale' },
      { id: 'PROD04', productName: 'Golden Penny Semovita', quantityRemaining: 80, remarks: 'Selling well', action: 'Monitor' },
    ],
  },
    {
    id: 'REP003',
    salesAgentName: 'John Doe',
    customerName: 'Justrite Ikeja',
    customerAddress: '789 Allen Avenue, Ikeja, Lagos',
    supplyDate: new Date('2024-07-18'),
    dateOfVisit: new Date('2024-07-22'),
    batchNumber: 'B112233',
    expiryDate: new Date('2025-01-20'),
    productCondition: 'Damaged',
    outstandingBalance: 25000,
    products: [
      { id: 'PROD02', productName: 'Dangote Sugar', quantityRemaining: 30, remarks: 'Some bags torn', action: 'Return to warehouse' },
      { id: 'PROD05', productName: 'Coca-Cola 50cl', quantityRemaining: 240, remarks: 'High demand', action: 'Monitor' },
    ],
  },
];
let adminUsers: AdminUser[] = [
  { id: 'admin001', email: 'admin1@example.com', password: 'password123' },
  { id: 'admin002', email: 'admin2@example.com', password: 'password123' },
];
let departments: Department[] = [];
let salesAgents: AdminUser[] = [
    { id: 'agent001', fullName: 'John Doe', email: 'john.doe@example.com', phone: '08012345678', password: 'password123' },
    { id: 'agent002', fullName: 'Jane Smith', email: 'jane.smith@example.com', phone: '08087654321', password: 'password123' },
];


// --- Stock Report Functions ---
export const getReports = async (): Promise<StockReport[]> => {
  return Promise.resolve(reports);
};

export const addReport = async (reportData: Omit<StockReport, 'id' | 'products'> & { products: Omit<ProductStock, 'id'|'remarks'|'action'>[] }): Promise<StockReport> => {
  const newReport: StockReport = {
    id: `REP${(reports.length + 1).toString().padStart(3, '0')}`,
    ...reportData,
    products: reportData.products.map((p, index) => ({
        ...p,
        id: `PROD${(Date.now() + index).toString()}`,
        remarks: 'N/A', // Default remarks
        action: 'N/A' // Default action
    })),
  };
  reports.push(newReport);
  return Promise.resolve(newReport);
};


// --- Admin User Functions ---
export const getAdminUserByEmail = async (email: string): Promise<AdminUser | undefined> => {
    return Promise.resolve(adminUsers.find(user => user.email === email));
};


// --- Sales Agent Functions ---
export const getAgents = async (): Promise<AdminUser[]> => {
    return Promise.resolve(salesAgents);
};

export const getAgentByEmail = async (email: string): Promise<AdminUser | undefined> => {
    return Promise.resolve(salesAgents.find(agent => agent.email === email));
};

export const addAgent = async (agentData: Omit<AdminUser, 'id'>): Promise<AdminUser> => {
  const newAgent: AdminUser = {
    id: `agent${(salesAgents.length + 1).toString().padStart(3, '0')}`,
    ...agentData,
  };
  salesAgents.push(newAgent);
  return Promise.resolve(newAgent);
};


// --- Department Functions ---
export const getDepartments = async (): Promise<Department[]> => {
    return Promise.resolve(departments);
};

export const addDepartment = async (departmentData: Omit<Department, 'id'>): Promise<Department> => {
  const newDepartment: Department = {
    id: `dept${(departments.length + 1).toString().padStart(3, '0')}`,
    ...departmentData,
  };
  departments.push(newDepartment);
   // Also add them to the adminUsers list so they can potentially log in to other systems
   adminUsers.push({ id: newDepartment.id, email: newDepartment.email, password: departmentData.password || 'password123' });
  return Promise.resolve(newDepartment);
};
