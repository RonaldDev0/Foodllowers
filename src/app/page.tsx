'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 150)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex w-full h-screen items-center justify-center bg-bg gap-12'>
      <h1 className='w-96 text-3xl'>This is the next big startup</h1>
    </div>
  )
}
