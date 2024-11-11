'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SearchBarr, InfluencerList, ProductList } from '@/components'
import { useContent, useUser } from '@/store'

export const revalidate = 7 * 24 * 60 * 60

export default function Home () {
  const { productList, setStore } = useContent()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    router.push('/')

    if (productList?.length) return

    fetch('/api/content/home')
      .then(res => res.json())
      .then(({ influencers, products }: any) => {
        setStore('influencerList', influencers)
        setStore('productList', products)
      })
  }, [user])

  return (
    <main className='flex flex-col w-full items-center gap-12'>
      <SearchBarr message />
      <InfluencerList />
      <ProductList />
    </main>
  )
}
