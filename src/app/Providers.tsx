'use client'
import { NextUIProvider } from '@nextui-org/react'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'

type Database = {
  public: {
    Tables: {
      movies: {
        Row: {}
        Insert: {}
        Update: {}
      }
    }
  }
}

type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function Providers ({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createPagesBrowserClient())
  const router = useRouter()
  const { setStore } = useUser()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session) {
        setStore('user', session.user.user_metadata)
        setStore('userId', session.user.id)
      }
    })
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => router.refresh())

    return () => subscription.unsubscribe()
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase }}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context
}
