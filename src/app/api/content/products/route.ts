import { supabase } from '../supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { influencer, serviceFee } = await req.json()

  const data = await supabase
    .from('products')
    .select('id, id_kitchen, preview, name, price, state, influencers( avatar, full_name, bank_account ), kitchens( open, address, bank_account )')
    .neq('preview', null)
    .then(({ data, error }) => {
      if (error || !data) return

      const products = data
        .filter((item: any) => item.influencers !== null)
        .filter((item: any) =>
          item.kitchens.address !== null &&
          item.kitchens.bank_account !== null &&
          item.influencers.bank_account !== null
        )

      const updatePrices = products.map((item: any) => ({
        ...item,
        price: item.price + influencer + serviceFee
      }))

      return updatePrices
    })

  return NextResponse.json(data)
}
