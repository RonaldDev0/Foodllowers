'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSupabase } from '@/app/supabaseProvider'

type IInfluencer = {
  id: number
  qualification: number
  full_name: string
  document_number: string
  gender: string
  preview: string
  bank: string
  path: string
}

type IContext = {
  influencerList: IInfluencer[]
}

const Context = createContext<IContext>({
  influencerList: []
})

export function ContentProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [influencerList, setInfluencerList] = useState<IInfluencer[]>([])

  useEffect(() => {
    supabase.from('influencers').select('*').order('id').then(({ data }: any) => setInfluencerList(data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ influencerList }}>
      <>{children}</>
    </Context.Provider>
  )
}

export function useContent () {
  return useContext(Context)
}
