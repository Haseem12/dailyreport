export interface ProductStock {
  id: string;
  productName: string;
  quantityRemaining: number;
  remarks: string;
  action: string;
}

export interface StockReport {
  id: string;
  salesAgentName: string;
  customerName: string;
  customerAddress: string;
  supplyDate: Date;
  dateOfVisit: Date;
  batchNumber: string;
  expiryDate: Date;
  productCondition: 'Good' | 'Damaged';
  outstandingBalance: number;
  products: ProductStock[];
}
