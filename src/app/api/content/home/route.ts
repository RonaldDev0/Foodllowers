/* eslint-disable camelcase */
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET () {
  const { data, error } = await supabase.rpc('get_home_data')

  if (error) return NextResponse.json({ error: true })

  console.log(data.products.filter((product: any) => product.id !== '8a163a56-2e8c-4eea-a569-ca376d35daa7'))

  return NextResponse.json({
    products: data.products.filter((product: any) => product.id !== '8a163a56-2e8c-4eea-a569-ca376d35daa7'),
    influencers: data.influencers.filter((influencer: any) => influencer.full_name !== 'WestCOL'),
    error: false
  })
}
