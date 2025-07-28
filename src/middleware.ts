
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session');
  const agentSession = request.cookies.get('agent_session');
  const { pathname } = request.nextUrl;

  // Allow access to public pages
  const publicPaths = ['/admin/login', '/register', '/login', '/entry'];
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect to admin login if trying to access admin pages without session
  if (pathname.startsWith('/admin') && !adminSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // For non-admin pages, check for agent session
  if (!pathname.startsWith('/admin') && !agentSession) {
     // You might want to redirect to an agent login page, e.g., /login
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
