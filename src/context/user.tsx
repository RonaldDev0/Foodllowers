'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSupabase } from '@/app/supabaseProvider'

type IContext = {
  user: any,
  setUser: Function
}

const Context = createContext<IContext>({
  user: undefined,
  setUser: Function
})

export function UserProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: { user: { user_metadata: user } } } }: any) => setUser(user))
  }, [])

  return (
    <Context.Provider value={{ user, setUser }}>
      <>{children}</>
    </Context.Provider>
  )
}

export function useUser () {
  return useContext(Context)
}
