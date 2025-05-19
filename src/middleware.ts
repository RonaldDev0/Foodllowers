import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificar si es una petición de la API
  const isApiRequest = req.nextUrl.pathname.startsWith('/api/')

  // Si es una petición de la API, verificar el token de Supabase
  if (isApiRequest) {
    const authHeader = req.headers.get('authorization')
    const supabaseAuthHeader = req.headers.get('x-supabase-auth')

    if (authHeader?.startsWith('Bearer ') || supabaseAuthHeader) {
      // Verificar el token con Supabase
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        return NextResponse.json(
          { error: 'No autorizado' },
          { status: 401 }
        )
      }

      // Si el token es válido, continuar
      return res
    }

    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  // Para rutas normales, mantener la lógica existente
  const { data: { session } } = await supabase.auth.getSession()
  const { pathname, searchParams } = req.nextUrl

  if (searchParams.has('code')) return res

  if (pathname === '/login' && session?.user?.role === 'authenticated') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!session && pathname !== '/login' && pathname !== '/install') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: [
    // Rutas de la API
    '/api/:path*',
    // Rutas normales (excluyendo archivos estáticos)
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/|img/).*)'
  ]
}
