import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res })
  const { data: { session } }: any = await supabase.auth.getSession()

  if (req.url.endsWith('/login') && session?.user?.role === 'authenticated') {
    return NextResponse.redirect(new URL('/profile', req.url))
  }

  if (session === null && (req.url.endsWith('/') || req.url.endsWith('/profile') || req.url.endsWith('/adresses'))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
