
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = 'https://sajfoods.net/dailyreport/api.php';

export async function login(prevState: { error: string | undefined } | undefined, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login_department', data: { email, password } }),
    });

    if (!response.ok) {
        // The server responded with an error status (e.g., 500)
        console.error('API Error:', await response.text());
        return { error: 'An error occurred with the server.' };
    }
    
    const result = await response.json();

    if (result.success && result.user) {
        const user = result.user;
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        cookies().set('session', user.email, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        
        // The redirect needs to be called outside the try-catch block
    } else {
        // Use the error from the backend if available, otherwise a generic one
        return { error: result.error || 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Login failed:', error);
    return { error: 'An unexpected error occurred during login.' };
  }

  // Redirect on success
  redirect('/admin');
}

export async function logout() {
  cookies().delete('session');
  redirect('/admin/login');
}
