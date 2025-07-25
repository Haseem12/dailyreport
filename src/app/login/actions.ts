
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginAgent } from '@/lib/data';

export async function loginAgentAction(prevState: { error: string | undefined } | undefined, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const agent = await loginAgent({ email, password });

  if (!agent) {
    return { error: 'Invalid email or password' };
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  cookies().set('agent-session', agent.email, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  redirect('/');
}

export async function logoutAgent() {
  cookies().delete('agent-session');
  redirect('/login');
}
