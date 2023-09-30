'use client'
import { createContext, useEffect, ReactNode } from 'react'
import { useSupabase } from '@/app/Providers'
import { useContent } from '@/store'

const Context = createContext({})

export function ContentProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const { setStore } = useContent()

  useEffect(() => {
    supabase.from('influencers').select('*').order('id').then(({ data }: any) => setStore('influencerList', data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ }}>
      <>{children}</>
    </Context.Provider>
  )
}
