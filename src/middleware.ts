// import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
// import type { Database } from '@/lib'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()

  // const supabase = createMiddlewareSupabaseClient<Database>({ req, res })
  // const { data: { session: { user: { role } } } }: any = await supabase.auth.getSession()
  // console.log(role)

  // if (req.nextUrl.pathname !== '/login' && session?.user.role !== 'authenticated') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // if (req.nextUrl.pathname.endsWith('/login') && role === 'authenticated') {
  //   return NextResponse.redirect(new URL('/profile', req.url))
  // }

  return res
}
