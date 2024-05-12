'use client'
import { Banner } from './Banner'
import { useSupabase } from '../Providers'
import { useEffect } from 'react'
import { useContent } from '@/store'
import { Alerts } from './Alerts'
import { ProductList } from './productList'

interface IProps {
  params: {
    influencerSlug: string
  }
}

export default function InfluencerPage ({ params: { influencerSlug } }: IProps) {
  const { supabase } = useSupabase()
  const { currentInfluencer, setStore } = useContent()

  useEffect(() => {
    if (currentInfluencer?.path === '/' + influencerSlug) {
      return
    }

    supabase
      .from('influencers')
      .select('id, full_name, path, avatar, banner, products(id, price, name, preview, state, kitchens( address, open ))')
      .neq('bank_account', null)
      .eq('path', '/' + influencerSlug)
      .single()
      .then(({ data, error }) => {
        if (error) {
          return
        }
        setStore('currentInfluencer', data)
      })
  }, [influencerSlug])

  if (!currentInfluencer) {
    return null
  }

  return (
    <main className='flex flex-col w-full mb-16 items-center gap-8'>
      <Alerts />
      <Banner />
      <ProductList />
    </main>
  )
}
