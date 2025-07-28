
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginAgent as loginAgentApi } from '@/lib/data';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAgent(formData: unknown) {
    const validatedFields = schema.safeParse(formData);

    if (!validatedFields.success) {
        return { success: false, error: 'Invalid data provided.' };
    }

    const { email, password } = validatedFields.data;
    const result = await loginAgentApi({ email, password });
    
    if (result.success) {
        const user = result.user;
        const sessionData = {
            userId: user.id,
            email: user.email,
            fullName: user.fullName,
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
}
