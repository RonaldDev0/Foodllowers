'use client'
import Image from 'next/image'
import { useSupabase } from '@/app/Providers'
import { useUser } from '@/context'

export default function Logout () {
  const { supabase } = useSupabase()
  const { setUser } = useUser()

  return (
    <div onClick={() => supabase.auth.signOut().then(() => setUser(null))} className='flex items-center justify-center gap-2 cursor-pointer mb-10'>
      <Image src='./icons/Logout.svg' alt='icon' width='25' height='25' priority />
      <button>Cerrar sesión</button>
    </div>
  )
}
