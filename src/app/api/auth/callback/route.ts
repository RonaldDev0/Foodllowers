import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET (req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.redirect(new URL('/login', req.url))

  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !(data.session?.user.role === 'authenticated')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.redirect(new URL('/', req.url))
}
