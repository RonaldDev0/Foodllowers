import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res })
  const { data: { session } }: any = await supabase.auth.getSession()

  if (session === null || session?.user?.role !== 'authenticated') {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return res
}

export const config = {
  matcher: ['/', '/profile']
}
