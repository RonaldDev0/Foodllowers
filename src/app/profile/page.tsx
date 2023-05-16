'use client'
import Image from 'next/image'
import { useUser } from '@/context'

export default function Profile () {
  const { user } = useUser()
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='bg-[#D9D9D9] bg-opacity-10 rounded-xl [@media(min-width:800px)]:w-[1200px] [@media(min-width:800px)]:h-[400px] flex [@media(max-width:800px)]:flex-col items-center gap-44 [@media(min-width:800px)]:p-48 [@media(max-width:800px)]:flex [@media(max-width:800px)]:justify-center [@media(max-width:800px)]:w-full [@media(max-width:800px)]:h-screen'>
        <Image src={user?.avatar_url} alt='avatar' width={300} height={300} className='rounded-full h-[300px]' />
        <div>
          <span className='text-[#A8A8A8]'>Name</span>
          <h1 className='text-xl'>{user?.full_name}</h1>
          <span className='text-[#A8A8A8]'>Email</span>
          <p className='text-xl'>{user?.email}</p>
        </div>
      </div>
    </div>
  )
}
