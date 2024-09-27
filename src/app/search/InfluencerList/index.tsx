'use client'
import { useEffect, useState } from 'react'
import { useSupabase } from '@/app/Providers'
import { InfluencerCard } from './influencerCard'
import { useSearchParams } from 'next/navigation'

export function InfluencerList () {
  const { supabase } = useSupabase()
  const query: any = useSearchParams().get('q')?.split(' ').join(' or ')

  const [influencers, setInfluencers] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('influencers')
      .select('id, full_name, avatar, description')
      .textSearch('full_name', query, { type: 'websearch' })
      .then(res => setInfluencers(res.data))
  }, [query])

  return (
    <div className='flex flex-col gap-5 mb-10'>
      {influencers?.map((item: any) => (
        <InfluencerCard
          item={item}
          key={item.id}
        />
      ))}
    </div>
  )
}
