
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginDepartment } from '@/lib/data';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function login(formData: unknown) {
    const validatedFields = schema.safeParse(formData);

    if (!validatedFields.success) {
        return { success: false, error: 'Invalid data provided.' };
    }

    const { email, password } = validatedFields.data;
    const result = await loginDepartment({ email, password });
    
    if (result.success) {
        const user = result.user;
        const sessionData = {
            userId: user.id,
            email: user.email,
            departmentName: user.departmentName,
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
