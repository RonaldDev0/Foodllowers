'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSupabase } from '@/app/Providers'
import { useUserPayment } from '@/store'

type IContext = {
  user: any
  setUser: Function
  userId: any
}

const Context = createContext<IContext>({
  user: undefined,
  setUser: Function,
  userId: ''
})

export function UserProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
  const { setStore } = useUserPayment()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session) {
        setUser(session.user.user_metadata)
        setUserId(session.user.id)
      }
    })

    supabase.from('shipments').select('*').order('id').then(({ data }) => setStore('shipmentList', data))

    supabase.from('adresses').select('*').order('id').then(({ data }) => {
      setStore('addressList', data?.map(({ address, id }: any) => ({ ...JSON.parse(address), id })))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ user, setUser, userId }}>
      <>{children}</>
    </Context.Provider>
  )
}

export function useUser () {
  return useContext(Context)
}
