import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

import type { Database } from '@/lib'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data: { session } }: any = await supabase.auth.getSession()

  if (req.url.endsWith('/login') && session?.user?.role === 'authenticated') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const isStaticFile = /\.(ico|svg|png|jpg|jpeg|gif|webp)$/.test(req.nextUrl.pathname)
  if (session === null && !req.nextUrl.pathname.startsWith('/_next') && !isStaticFile && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/manifest.json' && !req.nextUrl.searchParams.has('code')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
