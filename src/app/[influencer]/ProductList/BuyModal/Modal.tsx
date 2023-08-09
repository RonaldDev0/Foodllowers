'use client'

import { ReactNode } from 'react'
import { useUserPayment } from '@/store'

export function Modal ({ children }: { children: ReactNode }) {
  const { setStore } = useUserPayment()
  return (
    <div className='fixed top-0 left-0 z-50 flex justify-center items-center h-screen w-screen bg-black bg-opacity-30'>
      <div className='bg-bg p-8 rounded-md'>
        <div className='flex justify-end'>
          <button className='text-3xl bg-dark_bg px-2 my-4 rounded-md' onClick={() => setStore('buyModal', false)}>x</button>
        </div>
        <div className='flex flex-col gap-4'>
          {children}
        </div>
      </div>
    </div>
  )
}
