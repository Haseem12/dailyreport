
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('session')?.value;
  const agentSession = request.cookies.get('agent-session')?.value;

  const { pathname } = request.nextUrl;

  // Admin routes protection
  const isAccessingAdmin = pathname.startsWith('/admin');
  const isAdminLoginPage = pathname === '/admin/login';

  if (!adminSession && isAccessingAdmin && !isAdminLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (adminSession && isAdminLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  // Agent routes protection
  const agentRoutes = ['/', '/entry'];
  const isAccessingAgentRoute = agentRoutes.includes(pathname);
  const isAgentLoginPage = pathname === '/login';

  if (!agentSession && isAccessingAgentRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (agentSession && isAgentLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login', '/', '/entry', '/login'],
};
