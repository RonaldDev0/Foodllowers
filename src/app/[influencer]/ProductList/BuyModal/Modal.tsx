'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { useUserPayment } from '@/store'

export function Modal ({ children }: { children: ReactNode }) {
  const { setStore } = useUserPayment()
  return (
    <div className='fixed top-0 left-0 z-50 flex justify-center items-center h-screen w-screen bg-black bg-opacity-30'>
      <div className='bg-bg p-8 rounded-md'>
        <div className='flex justify-end'>
          <Image src='icons/x.svg' alt='close' width={40} height={40} className='cursor-pointer pb-4' onClick={() => setStore('buyModal', false)} />
        </div>
        <div className='flex flex-col gap-4'>
          {children}
        </div>
      </div>
    </div>
  )
}
