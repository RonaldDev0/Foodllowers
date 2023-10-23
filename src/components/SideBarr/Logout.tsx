'use client'
import { LogOut } from 'lucide-react'
import { useSupabase } from '@/app/Providers'
import { useUser } from '@/store'

export default function Logout () {
  const { supabase } = useSupabase()
  const { setStore } = useUser()

  const handleLogout = () => {
    supabase.auth.signOut()
      .then(() => {
        setStore('user', null)
        setStore('userId', null)
      })
  }

  return (
    <div
      onClick={handleLogout}
      className='flex items-center justify-center gap-2 cursor-pointer mb-10'
    >
      <LogOut size={25} />
      <p>
        Cerrar sesión
      </p>
    </div>
  )
}
