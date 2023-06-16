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
  searchFilter: IInfluencer[] | undefined
  setSearchFilter: Function
}

const Context = createContext<IContext>({
  influencerList: [],
  searchFilter: [],
  setSearchFilter: Function
})

export function ContentProvider ({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [influencerList, setInfluencerList] = useState<IInfluencer[]>([])
  const [searchFilter, setSearchFilter] = useState<IInfluencer[]>([])

  useEffect(() => {
    supabase.from('influencers').select('*').order('id').then(({ data }: any) => {
      setInfluencerList(data)
      setSearchFilter(data)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ influencerList, searchFilter, setSearchFilter }}>
      <>{children}</>
    </Context.Provider>
  )
}

export function useContent () {
  return useContext(Context)
}
