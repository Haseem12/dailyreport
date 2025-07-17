import type { StockReport, AdminUser } from '@/lib/types';

export const adminUsers: AdminUser[] = [
  { id: 'admin001', email: 'admin1@example.com', password: 'password123' },
  { id: 'admin002', email: 'admin2@example.com', password: 'password123' },
  { id: 'admin003', email: 'admin3@example.com', password: 'password123' },
  { id: 'admin004', email: 'admin4@example.com', password: 'password123' },
];

export const mockReports: StockReport[] = [
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
