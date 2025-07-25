
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminUserByEmail } from '@/lib/data';

export async function login(prevState: { error: string | undefined } | undefined, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await getAdminUserByEmail(email);

  if (!user || user.password !== password) {
    return { error: 'Invalid email or password' };
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  cookies().set('session', user.email, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  redirect('/admin');
}

export async function logout() {
  cookies().delete('session');
  redirect('/admin/login');
}
