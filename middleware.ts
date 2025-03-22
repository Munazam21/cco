import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Check for Supabase session cookies
  // Supabase stores sessions in different cookie formats
  const hasSbSession = req.cookies.has('sb-session')
  const hasAuthToken = req.cookies.has('supabase-auth-token')
  const hasAccessToken = req.cookies.has('sb-access-token')
  const hasRefreshToken = req.cookies.has('sb-refresh-token')
  
  // Combined check for any valid session cookie
  const hasSession = hasSbSession || hasAuthToken || hasAccessToken || hasRefreshToken
  
  console.log('Middleware session check:', { 
    hasSbSession, 
    hasAuthToken,
    hasAccessToken,
    hasRefreshToken,
    hasSession,
    path: req.nextUrl.pathname
  })
  
  // If accessing admin routes without session cookie, redirect to login
  if (req.nextUrl.pathname.startsWith('/admin') && !hasSession) {
    const redirectUrl = new URL('/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If already has session cookie and trying to access login page, redirect to admin
  if (req.nextUrl.pathname === '/login' && hasSession) {
    const redirectUrl = new URL('/admin', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/login'],
} 