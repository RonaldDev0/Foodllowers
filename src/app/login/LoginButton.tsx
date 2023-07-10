'use client'

import Image from 'next/image'
import { useSupabase } from '../supabaseProvider'

// Types
import { provider } from './providers'

export default function LoginButon ({ name, logo, provider }: provider) {
  const { supabase } = useSupabase()

  const Login = async () => {
    await supabase.auth.signInWithOAuth({ provider })
  }

  return (
    <div className='flex w-full justify-center'>
      <button onClick={() => Login()} className='w-72 flex items-center gap-4 h-16 bg-dark_gray text-xl rounded-xl p-2 [@media(max-width:800px)]:text-black [@media(min-width:800px)]:bg-bg [@media(min-width:800px)]:hover:bg-dark_bg [@media(min-width:800px)]:transition-all'>
        <Image src={logo} alt={name} width='50' height='50' />
        <p>Inicar sesión con {name}</p>
      </button>
    </div>
  )
}
