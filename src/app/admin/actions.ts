
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getAgents, getDepartments, getStockReports } from '@/lib/data';

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
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sajfoods.net/dailyreport/api.php';
  let result;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'add_agent', 
        data: validatedFields.data 
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      return { success: false, message: `Server error: ${response.status}` };
    }
    
    result = await response.json();

  } catch (error) {
    console.error('Fetch API Error:', error);
    return { success: false, message: 'Failed to connect to the server.' };
  }

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

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sajfoods.net/dailyreport/api.php';
    let result;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action: 'add_department', 
                data: validatedFields.data 
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error Response: ${errorText}`);
            return { success: false, message: `Server error: ${response.status}` };
        }
        
        result = await response.json();

    } catch (error) {
        console.error('Fetch API Error:', error);
        return { success: false, message: 'Failed to connect to the server.' };
    }


    if (result.success) {
        revalidatePath('/admin');
    }

    return result;
}

// Functions to fetch data for dashboard lists
export { getAgents, getDepartments, getStockReports };
