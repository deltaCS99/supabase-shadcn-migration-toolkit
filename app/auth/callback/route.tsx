import { NextResponse } from 'next/server'
import { createClient } from '@/supabase/server'


const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()

    try {
      await supabase.auth.exchangeCodeForSession(code)
      return NextResponse.redirect(`${baseUrl}`)
    } catch (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(`${baseUrl}/login`)
    }
  }

  // Return to login if no code
  return NextResponse.redirect(`${baseUrl}/login`)
}