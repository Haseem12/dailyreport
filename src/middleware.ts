
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('session')?.value;
  const agentSession = request.cookies.get('agent-session')?.value;

  const { pathname } = request.nextUrl;

  const agentRoutes = ['/', '/entry'];
  const adminRoutes = ['/admin'];

  // Redirect from login pages if already logged in
  if (pathname === '/login' && agentSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (pathname === '/admin/login' && adminSession) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Protect agent routes
  if (agentRoutes.includes(pathname) && !agentSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !adminSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login', '/', '/entry', '/login'],
};
