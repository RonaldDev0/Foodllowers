'use client'

import { useContent } from '@/context'
import { InfluencerCard } from './InfluencerCard'

export function InfluencerList () {
  const { influencerList } = useContent()

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {
        influencerList && influencerList.map((influencer) => <InfluencerCard key={influencer.id} influencer={influencer} />)
      }
    </div>
  )
}
