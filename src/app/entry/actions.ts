
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addStockReport } from '@/lib/data';

const productSchema = z.object({
  productName: z.string().min(1, 'Product selection is required.'),
  quantityRemaining: z.coerce.number().min(0, 'Quantity cannot be negative.'),
  batchNumber: z.string().min(1, 'Batch number is required.'),
  supplyDate: z.date(),
  expiryDate: z.date(),
  productCondition: z.enum(['Good', 'Damaged', 'Expired']),
});

const reportSchema = z.object({
  salesAgentName: z.string().min(1, { message: 'Sales agent name is required.' }),
  customerName: z.string().min(1, { message: 'Customer name is required.' }),
  customerAddress: z.string().min(1, { message: 'Customer address is required.' }),
  dateOfVisit: z.date({ required_error: 'Date of visit is required.' }),
  outstandingBalance: z.coerce.number().min(0, { message: 'Outstanding balance must be a positive number.' }),
  products: z.array(productSchema).min(1, 'At least one product must be added.'),
});

export async function submitStockReport(formData: unknown) {
  const validatedFields = reportSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.error('Form validation failed:', validatedFields.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid form data. Please check your inputs.' };
  }

  const result = await addStockReport(validatedFields.data);

  if (result.success) {
    // Revalidate the path to the admin dashboard to show the new report
    revalidatePath('/admin');
  }

  return result;
}
