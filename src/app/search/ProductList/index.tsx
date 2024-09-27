'use client'
import { useSupabase } from '@/app/Providers'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from './ProductCard'

export function ProductList () {
  const { supabase } = useSupabase()
  const query: any = useSearchParams().get('q')?.split(' ').join(' or ')

  const [products, setProducts] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('products')
      .select('id, category, name, price, preview, state, influencers( avatar, full_name )')
      .textSearch('name', query, { type: 'websearch' })
      .then(({ data, error }) => {
        if (error) return
        setProducts(data.filter((item: any) => item.influencers !== null))
      })
  }, [query])

  return (
    <div className='flex flex-wrap gap-5 justify-center max-w-7xl'>
      {products?.map((item: any) => (
        <ProductCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}
