'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useContent } from '@/context'

export function SearchBarr () {
  const { influencerList, setSearchFilter } = useContent()
  const [input, setInput] = useState<any>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setSearchFilter(influencerList?.filter(item => item.full_name.includes(input)))
  }

  return (
    <div className='mt-24 flex flex-col items-center'>
      <p className='text-xl m-2'>What's your favorite influencer</p>
      <form className='flex' onSubmit={handleSubmit}>
        <input onChange={(e: any) => setInput(e.target.value)} value={input} className='bg-dark_bg outline-none p-3 w-[500px] [@media(min-width:800px)]:focus:w-[600px] transition-all rounded-l-lg [@media(max-width:800px)]:w-[300px]' placeholder='Search...' type='text' />
        <button className='bg-dark_bg p-3 rounded-r-lg'>
          <Image src='./icons/search.svg' width='30' height='30' alt='search.svg' />
        </button>
      </form>
    </div>
  )
}
