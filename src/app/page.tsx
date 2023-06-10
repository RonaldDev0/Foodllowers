'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { SearchBarr, InfluencerList } from '@/components'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 200)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col w-full h-screen items-center  bg-bg gap-12'>
      <SearchBarr />
      <InfluencerList />
    </div>
  )
}
