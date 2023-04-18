'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home () {
  const router = useRouter()

  return (
    <div className='flex w-full h-screen items-center justify-center bg-[#2f2f2f]'>
      <button onClick={() => router.push('/profile')}>Profile</button>
      <Image src='./foodllowers-logo.svg' alt='logo' width='1000' height='1000' priority className='bg-white rounded-xl' />
    </div>
  )
}
