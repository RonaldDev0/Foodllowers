'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSupabase } from '@/app/supabaseProvider'

type IContext = {
  user: any
  setUser: Function
  adresses: any
  setAdresses: Function
  userId: any
}

const Context = createContext<IContext>({
  user: undefined,
  setUser: Function,
  adresses: {},
  setAdresses: Function,
  userId: ''
})

export function UserProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
  const [adresses, setAdresses] = useState<any>()
  // const [payments, setPayments] = useState()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: { user } } }: any) => {
      setUser(user.user_metadata)
      setUserId(user.id)
    })

    supabase.from('adresses').select('*').order('id').then(({ data }) => setAdresses(data))
  }, [])

  return (
    <Context.Provider value={{ user, setUser, adresses, setAdresses, userId }}>
      <>{children}</>
    </Context.Provider>
  )
}

export function useUser () {
  return useContext(Context)
}
