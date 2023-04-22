'use client'
import Image from 'next/image'
import { useSupabase } from '@/app/supabaseProvider'

export default function Logout () {
  const { supabase } = useSupabase()

  return (
    <div onClick={() => supabase.auth.signOut()} className='flex items-center justify-center gap-2 cursor-pointer mb-10'>
      <Image src='./icons/Logout.svg' alt='icon' width='25' height='25' />
      <button>Logout</button>
    </div>
  )
}
