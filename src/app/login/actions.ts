
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAgentByEmail } from '@/lib/data';

export async function loginAgent(prevState: { error: string | undefined } | undefined, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const agent = await getAgentByEmail(email);

  if (!agent || agent.password !== password) {
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
