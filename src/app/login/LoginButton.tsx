'use client'

import Image from 'next/image'
import { useSupabase } from '../Providers'

export function LoginButton () {
  const { supabase } = useSupabase()

  const Login = async () => await supabase.auth.signInWithOAuth({ provider: 'google' })

  return (
    <button
      onClick={() => Login()}
      className='bg-[#1f1f1f] rounded-lg flex justify-center items-center gap-4 w-80 p-2 text-xl hover:bg-[#2f2f2f] transition-all'
    >
      <Image src='./icons/google.svg' alt='Google' width='50' height='50' />
      <p>Inicar sesión con Google</p>
    </button>
  )
}
