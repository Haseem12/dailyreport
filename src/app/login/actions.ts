
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sajfoods.net/dailyreport/api.php';
    let result;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action: 'login_agent', 
                data: { email, password }
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error Response: ${errorText}`);
            return { success: false, error: `Server error: ${response.status}` };
        }
        
        result = await response.json();

    } catch (error) {
        console.error('Fetch API Error:', error);
        return { success: false, error: 'Failed to connect to the server.' };
    }

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
