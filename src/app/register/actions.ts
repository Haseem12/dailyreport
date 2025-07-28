
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { registerAgent, registerDepartment } from '@/lib/data';

const agentSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const departmentSchema = z.object({
  departmentName: z.string().min(1, { message: 'Department name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function register(formData: unknown, type: 'agent' | 'department') {
  if (type === 'agent') {
    const validatedFields = agentSchema.safeParse(formData);
    if (!validatedFields.success) {
        return { success: false, message: 'Invalid form data.' };
    }
    const result = await registerAgent(validatedFields.data);
    if (result.success) {
      // Agents can be registered by admins, so we don't redirect here.
      // The form will show a success toast.
    }
    return result;

  } else if (type === 'department') {
    const validatedFields = departmentSchema.safeParse(formData);
    if (!validatedFields.success) {
      return { success: false, message: 'Invalid form data submitted.' };
    }
    const result = await registerDepartment(validatedFields.data);
    if (result.success) {
      redirect('/login');
    }
    return result;
  }

  return { success: false, message: 'Invalid registration type.' };
}
