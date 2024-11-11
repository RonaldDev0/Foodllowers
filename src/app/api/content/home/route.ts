/* eslint-disable camelcase */
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET () {
  const [costsResponse, influencersResponse] = await Promise.all([
    supabase
      .from('costs')
      .select('cost')
      .neq('role', 'delivery_minima')
      .neq('role', 'delivery_price_per_km'),
    supabase
      .from('influencers')
      .select(`
        id, full_name, avatar, bank_account,
        products(id, preview, name, price, state,
          kitchens(address, open, bank_account))
      `)
      .neq('bank_account', null)
      .match({ register_step: 'finished' })
  ])

  if (costsResponse.error || influencersResponse.error) return NextResponse.json({ error: 'Database error' })

  const influencers = influencersResponse.data?.filter(({ products }: any) =>
    products.length && products[0]?.kitchens?.address !== null
  )

  const products = influencers
    .flatMap((influencer: any) =>
      influencer.products.map((product: any) => ({
        ...product,
        influencers: {
          full_name: influencer.full_name,
          avatar: influencer.avatar
        },
        price: product.price + costsResponse.data[0].cost + costsResponse.data[1].cost
      }))
    )
    .filter((product: any) =>
      product.kitchens?.address !== null &&
      product.kitchens?.bank_account !== null &&
      product.preview !== null
    )

  return NextResponse.json({
    influencers: influencers.map(({ avatar, full_name }) => ({ avatar, full_name })),
    products: products.map(({ preview, name, price, state, influencers, id }) => ({
      id,
      preview,
      name,
      price,
      state,
      influencers
    }))
  })
}
