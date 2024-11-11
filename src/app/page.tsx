'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchBarr, InfluencerList, ProductList } from '@/components'
import { useContent } from '@/store'

export const revalidate = 7 * 24 * 60 * 60

export default function Home () {
  const { productList, setStore } = useContent()
  const router = useRouter()
  const loginCode = useSearchParams().get('code')

  function getData () {
    fetch('/api/content/home')
      .then(res => res.json())
      .then(({ influencers, products }: any) => {
        setStore('influencerList', influencers)
        setStore('productList', products)
      })
  }

  useEffect(() => {
    if (loginCode) {
      setTimeout(() => {
        router.push('/')
        return getData()
      }, 200)
      return
    }

    if (productList?.length) return

    getData()
  }, [])

  return (
    <main className='flex flex-col w-full items-center gap-12'>
      <SearchBarr message />
      <InfluencerList />
      <ProductList />
    </main>
  )
}
