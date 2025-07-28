
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { registerDepartment } from '@/lib/data';

const schema = z.object({
  departmentName: z.string().min(1, { message: "Department name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export async function registerAdmin(formData: unknown) {
  const validatedFields = schema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid form data submitted." };
  }
  
  const result = await registerDepartment(validatedFields.data);

  if (result.success) {
    redirect('/admin/login');
  }

  return result;
}
