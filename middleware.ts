import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // For simplicity in this version, we'll just check for cookies
  // In a production app, you'd implement more robust validation
  
  const hasSessionCookie = req.cookies.has('sb-session') || req.cookies.has('supabase-auth-token')
  
  // If accessing admin routes without session cookie, redirect to login
  if (req.nextUrl.pathname.startsWith('/admin') && !hasSessionCookie) {
    const redirectUrl = new URL('/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If already has session cookie and trying to access login page, redirect to admin
  if (req.nextUrl.pathname === '/login' && hasSessionCookie) {
    const redirectUrl = new URL('/admin', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/login'],
} 