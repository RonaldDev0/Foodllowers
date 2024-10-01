/* eslint-disable camelcase */
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } }: any = await supabase.auth.getSession()

  const isMaximumConnections = await supabase
    .rpc('get_realtime_users')
    .then(({ data, error }) => {
      if (error) return
      const { realtime_users, total_connections } = data[0]
      const isMaximumConnections = realtime_users >= 150 || total_connections >= 150
      return isMaximumConnections
    })

  const isStaticFile = /\.(ico|svg|png|jpg|jpeg|gif|webp)$/
    .test(req.nextUrl.pathname)

  const isNotLoginPage = !req.nextUrl.pathname.startsWith('/_next') &&
    !isStaticFile &&
    req.nextUrl.pathname !== '/login' &&
    req.nextUrl.pathname !== '/manifest.json' &&
    !req.nextUrl.searchParams.has('code')

  const isNotErrorPage = !req.nextUrl.pathname.startsWith('/_next') &&
    !isStaticFile &&
    req.nextUrl.pathname !== '/error' &&
    req.nextUrl.pathname !== '/manifest.json' &&
    !req.nextUrl.searchParams.has('code')

  if (req.url.endsWith('/install')) return

  if (isMaximumConnections && isNotErrorPage) {
    return NextResponse.redirect(new URL('/error', req.url))
  }

  if (req.url.endsWith('/login') &&
    session?.user?.role === 'authenticated') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (session === null && isNotLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
