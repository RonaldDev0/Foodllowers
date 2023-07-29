'use client'

import { InfluencerCard } from './InfluencerCard'
import { useContent } from '@/store'

export function InfluencerList () {
  const { searchFilter: influencerList } = useContent()

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {
        influencerList && influencerList.map((influencer: any) => <InfluencerCard key={influencer.id} influencer={influencer} />)
      }
    </div>
  )
}
