'use client'

import { Banner } from './Banner'
import { Alert } from '../../components/Alert'
import { useSupabase } from '../Providers'
import { useState, useEffect } from 'react'
import { ProductCard, IProductCard } from './ProductCard'

export default function InfluencerPage ({ params: { influencerSlug } }: any) {
  const { supabase } = useSupabase()
  const [influencer, setInfluencer] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('influencers')
      .select('id, full_name, avatar, banner, products(id, price, name, preview, state, kitchens( address, open ))')
      .neq('bank_account', null)
      .eq('path', '/' + influencerSlug)
      .then(res => {
        if (res.error) {
          return
        }
        setInfluencer(res.data[0])
      })
  }, [influencerSlug])

  if (!influencer) {
    return null
  }

  return (
    <main className='flex flex-col w-full mb-16 items-center gap-8'>
      {!influencer.products[0]?.kitchens.open && <Alert message='Este restaurante esta cerrado!!' />}
      {!influencer.products[0]?.kitchens.address && <Alert message='Este restaurante aun no esta listo para entregar domicilios' />}
      <Banner influencer={influencer} />
      <div className='flex w-full justify-center flex-wrap gap-5 mb-10 max-w-7xl'>
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
