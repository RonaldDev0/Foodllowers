import { createClient } from '@supabase/supabase-js'

const url: any = process.env.NEXT_PUBLIC_SUPABASE_URL
const key: any = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY

export const supabase = createClient(url, key)
