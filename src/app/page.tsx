'use client'

import { useSupabase } from './supabaseProvider'
import Link from 'next/link'

export default function Home () {
  const { supabase } = useSupabase()

  const signOut = () => supabase.auth.signOut()

  return (
    <div className='flex w-full h-screen items-center justify-center bg-[#2f2f2f] gap-12'>
      <Link href='/profile'>Profile</Link>
      <button onClick={signOut}>signOut</button>
    </div>
  )
}
