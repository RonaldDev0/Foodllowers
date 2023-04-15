import { createClient } from '@supabase/supabase-js'

// const url: any = process.env.NEXT_PUBLIC_SUPABASE_URL
// const key: any = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY

// export const supabase = createClient(url, key)

export const supabase = createClient('https://gtsjuxikwdifunrkhpyp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0c2p1eGlrd2RpZnVucmtocHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyNjQyOTAsImV4cCI6MTk5Njg0MDI5MH0.2HeeYbOngoswMTVz3kC2Dkid8Q5DuJvycyMnptitggE')
