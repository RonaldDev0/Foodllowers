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
        const { address } = products[0].kitchens
        return address !== null
      })
      return influencers
    })

  return NextResponse.json(data)
}
