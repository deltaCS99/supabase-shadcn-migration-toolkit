import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define authentication paths
  const isLoginPath = request.nextUrl.pathname === '/login'
  const isSignupPath = request.nextUrl.pathname === '/signup'
  const isAuthPath = isLoginPath || isSignupPath
  
  // Define protected paths
  const isDashboardPath = request.nextUrl.pathname === '/dashboard'
  
  // Redirect to home if authenticated user tries to access auth pages
  if (user && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect unauthenticated users from dashboard
  if (!user && isDashboardPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}