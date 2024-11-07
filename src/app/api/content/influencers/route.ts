import { supabase } from '../supabase'
import { NextResponse } from 'next/server'

export async function GET () {
  const data = await supabase
    .from('influencers')
    .select('id, full_name, avatar, products(kitchens( address, open ))')
    .neq('bank_account', null)
    .eq('register_step', 'finished')
    .then(({ data, error }) => {
      if (error) return

      const influencers = data.filter(({ products }: any) => {
        return products.length && products[0].kitchens && products[0].kitchens.address !== null
      })
      return influencers
    })

  return NextResponse.json(data)
}
