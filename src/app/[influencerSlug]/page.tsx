'use client'

import { Banner } from './Banner'
import { useSupabase } from '../Providers'
import { useState, useEffect } from 'react'
import { ProductCard, IProductCard } from './ProductCard'

export default function InfluencerPage ({ params: { influencerSlug } }: any) {
  const { supabase } = useSupabase()
  const [influencer, setInfluencer] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('influencers')
      .select('id, full_name, qualification, preview, products(id, price, name, description)')
      .eq('path', '/' + influencerSlug)
      .then(res => setInfluencer(res.data?.length && res.data[0]))
  }, [influencerSlug])

  if (!influencer) {
    return null
  }

  return (
    <main>
      <Banner influencer={influencer} />
      <div className='flex w-full my-10 justify-center flex-wrap gap-5 mb-10'>
        {influencer.products?.map((product: IProductCard) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  )
}
