'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib'

export default function Profile () {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: { user: { user_metadata: user } } } }: any) => setUser(user))
  }, [])
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='bg-[#D9D9D9] bg-opacity-10 rounded-xl w-[1200px] h-[400px] flex items-center'>
        <Image src={user?.avatar_url} alt='avatar' width={300} height={300} className='rounded-full h-[300px] mx-48' />
        <div>
          <span className='text-[#A8A8A8]'>Name</span>
          <h1>{user?.full_name}</h1>
          <span className='text-[#A8A8A8]'>Email</span>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  )
}
