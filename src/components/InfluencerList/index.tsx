'use client'
import { InfluencerCard } from './InfluencerCard'
import { useContent } from '@/store'
import { useEffect } from 'react'
import { Skeleton } from '@nextui-org/react'

export function InfluencerList () {
  const { influencerList, setStore } = useContent()

  useEffect(() => {
    if (influencerList) return

    fetch('/api/content/influencers')
      .then(res => res.json())
      .then(data => setStore('influencerList', data))
  }, [])

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {influencerList?.length
        ? influencerList.map(influencer => (
          <InfluencerCard
            influencer={influencer}
            key={influencer.id}
          />
        ))
        : <Skeleton className='rounded-full w-20 h-20' />}
    </div>
  )
}
