import { createClient } from '@supabase/supabase-js'

const url: any = process.env.SUPABASE_URL
const key: any = process.env.SUPABSE_ANON_KEY

export const supabase = createClient(url, key)
