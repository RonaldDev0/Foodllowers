'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSupabase } from '@/app/supabaseProvider'

export default function Profile () {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: { user: { user_metadata: user } } } }: any) => setUser(user))
  }, [])

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <Image src={user?.avatar_url} alt='avatar' width={200} height={200} className='rounded-full h-[200px]' />
      <span className='text-xl'>{user?.full_name}</span>
    </div>
  )
}
