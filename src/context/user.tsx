'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSupabase } from '@/app/supabaseProvider'

type IContext = {
  user: any
  setUser: Function
  addresses: any
  setAdresses: Function
  userId: any
  cards: any
  setCards: Function
}

const Context = createContext<IContext>({
  user: undefined,
  setUser: Function,
  addresses: undefined,
  setAdresses: Function,
  userId: '',
  cards: undefined,
  setCards: Function
})

export function UserProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
  const [addresses, setAdresses] = useState<any>()
  const [cards, setCards] = useState<any>()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session) {
        setUser(session.user.user_metadata)
        setUserId(session.user.id)
      }
    })

    supabase.from('adresses').select('*').order('id').then(({ data }) => setAdresses(data))
    // supabase.from('cards').select('*').order('id').then(({ data }) => setCards(data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ user, setUser, addresses, setAdresses, userId, cards, setCards }}>
      <>{children}</>
    </Context.Provider>
  )
}

export function useUser () {
  return useContext(Context)
}
