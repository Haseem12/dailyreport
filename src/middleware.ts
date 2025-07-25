
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('session')?.value;
  const agentSession = request.cookies.get('agent-session')?.value;

  const { pathname } = request.nextUrl;

  // --- Agent Route Protection ---
  const agentRoutes = ['/', '/entry'];
  const isAccessingAgentRoute = agentRoutes.includes(pathname);
  const isAgentLoginPage = pathname === '/login';

  if (isAgentLoginPage) {
    // If agent is logged in, redirect from login page to dashboard
    if (agentSession) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Otherwise, allow access to login page
    return NextResponse.next();
  }

  if (isAccessingAgentRoute) {
    // If trying to access agent routes without a session, redirect to login
    if (!agentSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }


  // --- Admin Route Protection ---
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminLoginPage = pathname === '/admin/login';

  if (isAdminLoginPage) {
      // If admin is logged in, redirect from login page to dashboard
      if (adminSession) {
          return NextResponse.redirect(new URL('/admin', request.url));
      }
      // Otherwise, allow access to login page
      return NextResponse.next();
  }

  if (isAdminRoute) {
      // If trying to access admin routes without a session, redirect to login
      if (!adminSession) {
          return NextResponse.redirect(new URL('/admin/login', request.url));
      }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login', '/', '/entry', '/login'],
};
