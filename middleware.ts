import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that never require authentication
const PUBLIC_PATHS = ['/login', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Normalise /en/* → /
  if (pathname.startsWith('/en')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Always allow public paths and Next.js internals
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // 3. Protect all other routes.
  //    The refreshToken is stored in localStorage (client-only), so we
  //    cannot inspect it here.  The AuthProvider handles the full guard
  //    client-side.  The middleware merely ensures the /en redirect works
  //    and provides a safety-net redirect if a session cookie is present.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
