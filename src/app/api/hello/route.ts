import { useSupabase } from '@/app/supabaseProvider'

export async function GET (request: Request) {
  const { supabase } = useSupabase()
  const [adresses] = await Promise.all([
    supabase.from('adresses').select('*').order('id').then(({ data }) => data)
  ])
  return new Response(JSON.stringify(adresses))
}
