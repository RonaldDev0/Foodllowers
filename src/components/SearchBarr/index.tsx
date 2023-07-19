'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useContent } from '@/context'

export function SearchBarr () {
  const { influencerList, setSearchFilter } = useContent()

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className='mt-24 flex flex-col items-center'>
      <p className='text-xl m-2'>¿Cuál es tu influenciador favorito?</p>
      <form className='flex' onSubmit={handleSubmit}>
  
        <button className='bg-dark_bg p-3 rounded-r-lg'>
          <Image src='./icons/search.svg' width='30' height='30' alt='search.svg' />
        </button>
      </form>
    </div>
  )
}
