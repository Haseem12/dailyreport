
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

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
    redirect('/admin/login');
  }

  return result;
}
