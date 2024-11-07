import { supabase } from '../supabase'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const [costsResponse, influencersResponse] = await Promise.all([
      supabase.from('costs').select('role, cost'),
      supabase
        .from('influencers')
        .select(`
          id, full_name, avatar, bank_account,
          products(id, preview, name, price, state,
            kitchens(address, open, bank_account))
        `)
        .neq('bank_account', null)
        .eq('register_step', 'finished')
    ])

    if (costsResponse.error || influencersResponse.error) {
      return NextResponse.json(
        { error: costsResponse.error?.message || influencersResponse.error?.message },
        { status: 500 }
      )
    }

    const costs = costsResponse.data.reduce((acc: any, item: any) => {
      acc[item.role] = item.cost
      return acc
    }, {})

    const influencerFee = costs.influencer
    const serviceFee = costs.service_fee

    const influencers = influencersResponse.data?.filter(({ products }: any) =>
      products.length && products[0]?.kitchens?.address !== null
    )

    const products = influencers
      .flatMap((influencer: any) =>
        influencer.products.map((product: any) => ({
          ...product,
          influencers: {
            id: influencer.id,
            full_name: influencer.full_name,
            avatar: influencer.avatar
          },
          price: product.price + influencerFee + serviceFee
        }))
      )
      .filter((product: any) =>
        product.kitchens?.address !== null &&
        product.kitchens?.bank_account !== null &&
        product.preview !== null
      )

    return NextResponse.json({ influencers, products }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error processing the request' }, { status: 500 })
  }
}
