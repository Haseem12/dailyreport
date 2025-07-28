
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginAgent as loginAgentApi, loginDepartment as loginDepartmentApi } from '@/lib/data';

const agentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

const departmentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export async function login(formData: unknown, type: 'agent' | 'department') {
    if (type === 'agent') {
        const validatedFields = agentSchema.safeParse(formData);
        if (!validatedFields.success) {
            return { success: false, error: 'Invalid data provided.' };
        }
        const result = await loginAgentApi(validatedFields.data);
        if (result.success && result.user) {
            const sessionData = {
                userId: result.user.id,
                email: result.user.email,
                fullName: result.user.fullName,
            };
            cookies().set('agent_session', JSON.stringify(sessionData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });
            redirect('/');
        }
        return { success: false, error: result.error || 'Invalid email or password' };
    } else {
        const validatedFields = departmentSchema.safeParse(formData);
        if (!validatedFields.success) {
            return { success: false, error: 'Invalid data provided.' };
        }
        const result = await loginDepartmentApi(validatedFields.data);
        if (result.success && result.user) {
            const sessionData = {
                userId: result.user.id,
                email: result.user.email,
                departmentName: result.user.departmentName,
            };
            cookies().set('admin_session', JSON.stringify(sessionData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });
            redirect('/admin');
        }
        return { success: false, error: result.error || 'Invalid email or password' };
    }
}
