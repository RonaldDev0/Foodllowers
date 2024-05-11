'use client'
import { InfluencerCard } from './InfluencerCard'
import { useSupabase } from '../../app/Providers'
import { useContent } from '@/store'
import { useEffect } from 'react'

export function InfluencerList () {
  const { supabase } = useSupabase()
  const { influencerList, setStore } = useContent()

  useEffect(() => {
    if (!influencerList) {
      supabase
        .from('influencers')
        .select('id, full_name, avatar, path, products(kitchens( address, open ))')
        .neq('bank_account', null)
        .then(({ data, error }) => {
          if (error) {
            return
          }
          const influencers = data.filter(({ products }: any) => {
            const { address } = products[0].kitchens
            return address !== null
          })
          setStore('influencerList', influencers)
        })
    }
  }, [])

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {influencerList?.map(influencer => (
        <InfluencerCard
          influencer={influencer}
          key={influencer.id}
        />
      ))}
    </div>
  )
}
