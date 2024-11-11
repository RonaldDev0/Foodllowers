/* eslint-disable camelcase */
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET () {
  const { data, error } = await supabase.rpc('get_home_data')

  if (error) return NextResponse.json({ error: true })

  return NextResponse.json({ ...data, error: false })
}
