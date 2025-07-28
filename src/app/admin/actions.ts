
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addAgent, addDepartment, getAgents, getDepartments, getStockReports } from '@/lib/data';

const agentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const departmentSchema = z.object({
  departmentName: z.string().min(1, "Department name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerAgent(formData: unknown) {
  const validatedFields = agentSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  const result = await addAgent(validatedFields.data);
  
  if (result.success) {
    revalidatePath('/admin');
  }

  return result;
}

export async function registerDepartment(formData: unknown) {
    const validatedFields = departmentSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { success: false, message: "Invalid form data." };
    }

    const result = await addDepartment(validatedFields.data);

    if (result.success) {
        revalidatePath('/admin');
    }

    return result;
}

// Functions to fetch data for dashboard lists
export { getAgents, getDepartments, getStockReports };
