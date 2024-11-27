/* eslint-disable camelcase */
import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { query, influencer, serviceFee } = await req.json()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id, id_influencer, id_kitchen, category, preview, name, description, price, state,
      influencers(full_name, avatar, bank_account ),
      kitchens( open, address, bank_account )`
    )
    .eq('id', query)

  if (error) return NextResponse.json({ error: true })

  const updatePrice = data
    .filter((item: any) =>
      item.influencers !== null &&
      item.kitchens.address !== null &&
      item.kitchens.bank_account !== null &&
      item.influencers.bank_account !== null
    ).map(({ id, id_influencer, id_kitchen, category, preview, name, description, price, state, influencers, kitchens }: any) => ({
      ...{ id, id_influencer, id_kitchen, category, preview, name, description, price, state },
      influencers: { full_name: influencers.full_name, avatar: influencers.avatar },
      kitchens: { open: kitchens.open, address: kitchens.address }
    })).map((item: any) => ({
      ...item,
      price: item.price + influencer + serviceFee
    }))[0]

  return NextResponse.json(updatePrice)
}
