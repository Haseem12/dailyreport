
import type { StockReport, AdminUser, Department, ProductStock } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory data store, structured to persist across requests in a dev environment.
// We use a global variable to simulate a database that persists across hot reloads.
const globalForData = globalThis as unknown as { dataStore: any };

const dataStore = globalForData.dataStore || {
  reports: [
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
  ],
  adminUsers: [
    { id: 'admin001', email: 'admin1@example.com', password: 'password123' },
    { id: 'admin002', email: 'admin2@example.com', password: 'password123' },
  ],
  departments: [] as Department[],
  salesAgents: [] as AdminUser[],
};

// In a Next.js development environment, this ensures the dataStore persists across file changes.
if (process.env.NODE_ENV !== 'production') globalForData.dataStore = dataStore;


// --- Stock Report Functions ---
export const getReports = async (): Promise<StockReport[]> => {
  return Promise.resolve(dataStore.reports);
};

export const addReport = async (reportData: Omit<StockReport, 'id' | 'products'> & { products: Omit<ProductStock, 'id'|'remarks'|'action'>[] }): Promise<StockReport> => {
  const newReport: StockReport = {
    id: `REP${(dataStore.reports.length + 1).toString().padStart(3, '0')}`,
    ...reportData,
    products: reportData.products.map((p, index) => ({
        ...p,
        id: `PROD${(Date.now() + index).toString()}`,
        remarks: 'N/A', // Default remarks
        action: 'N/A' // Default action
    })),
  };
  dataStore.reports.unshift(newReport); // Add to the beginning of the array
  return Promise.resolve(newReport);
};


// --- Admin User Functions ---
export const getAdminUserByEmail = async (email: string): Promise<AdminUser | undefined> => {
    // Admin users are static and read from the initial config
    const staticAdminUsers = [
        { id: 'admin001', email: 'admin1@example.com', password: 'password123' },
        { id: 'admin002', email: 'admin2@example.com', password: 'password123' },
    ];
    return Promise.resolve(staticAdminUsers.find(user => user.email === email));
};


// --- Sales Agent Functions ---
export const getAgents = async (): Promise<AdminUser[]> => {
    return Promise.resolve(dataStore.salesAgents);
};

export const getAgentByEmail = async (email: string): Promise<AdminUser | undefined> => {
    return Promise.resolve(dataStore.salesAgents.find(agent => agent.email === email));
};

export const addAgent = async (agentData: Omit<AdminUser, 'id'>): Promise<AdminUser> => {
  const newAgent: AdminUser = {
    id: `agent${uuidv4()}`,
    ...agentData,
  };
  dataStore.salesAgents.push(newAgent);
  return Promise.resolve(newAgent);
};


// --- Department Functions ---
export const getDepartments = async (): Promise<Department[]> => {
    return Promise.resolve(dataStore.departments);
};

export const addDepartment = async (departmentData: Omit<Department, 'id'>): Promise<Department> => {
  const newDepartment: Department = {
    id: `dept${uuidv4()}`,
    ...departmentData,
  };
  dataStore.departments.push(newDepartment);
  return Promise.resolve(newDepartment);
};
