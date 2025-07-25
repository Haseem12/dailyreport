
'use server';

import { z } from 'zod';
import { addDepartment } from '@/lib/data';
import { redirect } from 'next/navigation';

// --- Department Registration ---
const departmentSchema = z.object({
  departmentName: z.string().min(2, 'Department name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterAdminFormState = {
  message: string;
  success: boolean;
};


export async function registerDepartmentAction(
    prevState: RegisterAdminFormState,
    formData: FormData
): Promise<RegisterAdminFormState> {
    const values = Object.fromEntries(formData.entries());
    const validatedFields = departmentSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            message: validatedFields.error.flatten().fieldErrors.password?.[0] || 'Invalid data provided.',
            success: false,
        };
    }

    try {
        await addDepartment(validatedFields.data);
    } catch (error) {
        console.error("Registration failed:", error);
        return {
            message: 'An error occurred during registration. The email may already be in use.',
            success: false,
        };
    }

    // Redirect to login page on success
    redirect('/admin/login?registered=true');
}
