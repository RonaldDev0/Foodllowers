'use client'
import { NextUIProvider } from '@nextui-org/react'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createPagesBrowserClient, type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useUser, useContent } from '@/store'

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
  const { setStore: setContentStore } = useContent()

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }: any) => {
        if (session) {
          setStore('user', session.user.user_metadata)
          setStore('userId', session.user.id)
        }

        supabase
          .from('costs')
          .select('*')
          .then(({ data, error }) => {
            if (error) return

            data.forEach(item => {
              switch (item.role) {
                case 'influencer':
                  setContentStore('influencer', item.cost)
                  break
                case 'delivery_minima':
                  setContentStore('minima', item.cost)
                  break
                case 'delivery_price_per_km':
                  setContentStore('pricePerKm', item.cost)
                  break
                case 'service_fee':
                  setContentStore('serviceFee', item.cost)
                  break
                default:
                  break
              }
            })
          })

        supabase
          .rpc('get_realtime_users')
          .then(({ data, error }) => {
            if (error) return
            console.log(data[0])
          })
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
