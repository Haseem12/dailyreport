export interface ProductStock {
  id: string;
  productName: string;
  quantityRemaining: number;
  batchNumber: string;
  supplyDate: Date;
  expiryDate: Date;
  productCondition: 'Good' | 'Damaged';
  remarks?: string; // Optional
  action?: string; // Optional
}

export interface StockReport {
  id: string;
  salesAgentName: string;
  customerName: string;
  customerAddress: string;
  dateOfVisit: Date;
  outstandingBalance: number;
  products: ProductStock[];

  // These fields may be deprecated if all data moves into products array
  supplyDate?: Date;
  batchNumber?: string;
  expiryDate?: Date;
  productCondition?: 'Good' | 'Damaged';
}

export interface AdminUser {
  id: string;
  email: string;
  password?: string;
  fullName?: string;
  phone?: string;
}

export interface Department {
    id: string;
    departmentName: string;
    email: string;
    password?: string;
}
