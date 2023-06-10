'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/app/supabaseProvider'
import { ProductCard, IProductCard } from './ProductCard'

export function ProductList ({ influencerId }: any) {
  const { supabase } = useSupabase()
  const [productList, setProductList] = useState<IProductCard[]>()

  useEffect(() => {
    if (influencerId) {
      const { id } = influencerId
      supabase.from('products').select('*').eq('id_influencer', id).order('id').then(({ data }: any) => setProductList(data))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [influencerId])

  return (
    <div className='flex flex-wrap gap-10'>
      {
        productList && productList.map((product) => <ProductCard key={product.id} product={product} />)
      }
    </div>
  )
}
