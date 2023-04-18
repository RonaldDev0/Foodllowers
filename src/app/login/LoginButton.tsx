'use client'

import Image from 'next/image'
import { supabase } from '@/lib'

// Types
import { provider } from './providers'

export default function LoginButon ({ name, logo, provider }: provider) {
  const Login = async () => {
    await supabase.auth.signInWithOAuth({ provider })
  }

  return (
    <div className='flex w-full justify-center'>
      <button onClick={() => Login()} className='w-72 flex items-center gap-4 h-16 bg-[#B3B3B3] text-xl rounded-xl p-2 [@media(max-width:800px)]:text-black [@media(min-width:800px)]:bg-[#2f2f2f] [@media(min-width:800px)]:hover:bg-[#1f1f1f] [@media(min-width:800px)]:transition-all'>
        <Image src={logo} alt={name} width='50' height='50' />
        <p>Login with {name}</p>
      </button>
    </div>
  )
}
