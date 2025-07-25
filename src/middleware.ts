
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('session')?.value;
  const agentSession = request.cookies.get('agent-session')?.value;
  const { pathname } = request.nextUrl;

  // If trying to access a login page while already logged in, redirect to the respective dashboard
  if (agentSession && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (adminSession && pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Define protected routes
  const agentRoutes = ['/'];
  
  // Protect Agent Routes - only the dashboard is protected now
  if (agentRoutes.includes(pathname)) {
    if (!agentSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect Admin Routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login', '/', '/entry', '/login'],
};
