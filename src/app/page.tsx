'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchBarr, InfluencerList, ProductList } from '@/components'

export const revalidate = 7 * 24 * 60 * 60

export default function Home () {
  const router = useRouter()
  const loginCode = useSearchParams().get('code')

  useEffect(() => {
    loginCode && setTimeout(() => router.push('/'), 200)
  }, [])

  return (
    <main className='flex flex-col w-full items-center gap-9'>
      <SearchBarr message />
      <InfluencerList />
      <ProductList />
    </main>
  )
}
