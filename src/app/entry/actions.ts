
'use server';

import { z } from 'zod';
import { addReport } from '@/lib/data';
import { revalidatePath } from 'next/cache';

const productSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  quantityRemaining: z.coerce.number().min(0, 'Quantity must be 0 or more'),
  batchNumber: z.string().min(1, 'Batch number is required'),
  supplyDate: z.date({ required_error: 'Supply date is required' }),
  expiryDate: z.date({ required_error: 'Expiry date is required' }),
  productCondition: z.enum(['Good', 'Damaged', 'Expired']),
});

const formSchema = z.object({
  salesAgentName: z.string().min(1, 'Sales agent name is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  customerAddress: z.string().min(1, 'Customer address is required'),
  dateOfVisit: z.date({ required_error: 'Date of visit is required' }),
  outstandingBalance: z.coerce.number().min(0, 'Balance must be 0 or more'),
  products: z.array(productSchema).min(1, 'At least one product is required'),
});

export async function submitStockReport(values: z.infer<typeof formSchema>) {
  const validatedData = formSchema.parse(values);

  // For simplicity, we'll derive some fields that are in the main StockReport type but not the form
  const reportData = {
    ...validatedData,
    // These would typically be part of the form or derived differently
    batchNumber: validatedData.products[0]?.batchNumber || 'N/A',
    supplyDate: validatedData.products[0]?.supplyDate || new Date(),
    expiryDate: validatedData.products[0]?.expiryDate || new Date(),
    productCondition: validatedData.products.some(p => p.productCondition === 'Expired') ? 'Expired' : validatedData.products.some(p => p.productCondition === 'Damaged') ? 'Damaged' : 'Good' as 'Good' | 'Damaged' | 'Expired',
  };

  await addReport(reportData);
  
  // Revalidate the admin path to show the new report
  revalidatePath('/admin');
}
