
'use server';

import { z } from 'zod';
import { addAgent, addDepartment } from '@/lib/data';
import { revalidatePath } from 'next/cache';

// --- Agent Registration ---
const agentSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number seems too short'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function registerAgent(values: z.infer<typeof agentSchema>) {
  const validatedData = agentSchema.parse(values);
  await addAgent(validatedData);
  revalidatePath('/admin');
}


// --- Department Registration ---
const departmentSchema = z.object({
  departmentName: z.string().min(2, 'Department name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function registerDepartment(values: z.infer<typeof departmentSchema>) {
  const validatedData = departmentSchema.parse(values);
  await addDepartment(validatedData);
  revalidatePath('/admin');
}
