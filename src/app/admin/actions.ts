
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getAgents, getDepartments, getStockReports, registerAgent as registerAgentApi, registerDepartment as registerDepartmentApi } from '@/lib/data';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
  
  const result = await registerAgentApi(validatedFields.data);

  if (result.success) {
    revalidatePath('/admin/agents');
  }

  return result;
}

export async function registerDepartment(formData: unknown) {
  const validatedFields = departmentSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid form data.' };
  }
  
  const result = await registerDepartmentApi(validatedFields.data);

  if (result.success) {
    revalidatePath('/admin/departments');
  }

  return result;
}

export async function logout() {
  cookies().delete('agent_session');
  cookies().delete('admin_session');
  redirect('/login');
}


// Functions to fetch data for dashboard lists
export { getAgents, getDepartments, getStockReports };
