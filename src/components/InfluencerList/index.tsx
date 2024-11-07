'use client'
import { InfluencerCard } from './InfluencerCard'
import { useContent } from '@/store'
import { Skeleton } from '@nextui-org/react'

export function InfluencerList () {
  const { influencerList } = useContent()

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {influencerList?.length
        ? influencerList.map(influencer => (
          <InfluencerCard
            influencer={influencer}
            key={influencer.id}
          />
        ))
        : Array(3).fill(0).map((_, i) => <Skeleton key={i} className='rounded-full w-20 h-20' />)}
    </div>
  )
}
