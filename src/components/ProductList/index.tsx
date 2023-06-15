'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/app/supabaseProvider'
import { ProductCard, IProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'

export function ProductList ({ influencerId }: any) {
  const { supabase } = useSupabase()
  const [productList, setProductList] = useState<IProductCard[]>()
  const [currentProduct, setCurrentProduct] = useState<IProductCard | undefined>()

  useEffect(() => {
    if (influencerId) {
      const { id } = influencerId
      supabase.from('products').select('*').eq('id_influencer', id).order('id').then(({ data }: any) => setProductList(data))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [influencerId])

  return (
    <div className='flex w-full my-10 justify-center'>
      <div className='flex flex-wrap gap-5 justify-center'>
        {
          productList && productList.map((product) => <ProductCard key={product.id} product={product} setCurrentProduct={setCurrentProduct} />)
        }
        {
          currentProduct && <ProductModal currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
        }
      </div>
    </div>
  )
}
