
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session');
  const agentSession = request.cookies.get('agent_session');
  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === '/login' || pathname === '/register';

  // If trying to access a public page, let them through.
  if(isPublicPath) {
    // If user is already logged in, redirect to their respective dashboard
    if (agentSession) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (adminSession) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') && !adminSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Protect agent routes
  if (!pathname.startsWith('/admin') && !isPublicPath && !agentSession) {
     return NextResponse.redirect(new URL('/login', request.url));
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - The entry page, which should be public
     */
    '/((?!api|_next/static|_next/image|favicon.ico|entry).*)',
  ],
}
