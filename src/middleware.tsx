import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { NEXT_REFRESH_TOKEN, NEXT_USER_TOKEN } from './constants'

export function middleware(request: NextRequest) {
  const refresh_token = request.cookies.get(NEXT_REFRESH_TOKEN)?.value
  const token = request.cookies.get(NEXT_USER_TOKEN)?.value

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  if (pathname.includes('account')) {
    if (!token || !refresh_token) {
      return NextResponse.redirect(new URL(`/auth`, request.url))
    }
  }

  if (pathname.includes('auth')) {
    if (token && refresh_token) {
      return NextResponse.redirect(new URL(`/account/pages`, request.url))
    }
  }
}

export const config = {
  // Skip all paths that should not be internationalized
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
