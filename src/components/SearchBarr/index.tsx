'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useContent } from '@/store'

export function SearchBarr () {
  const { influencerList, setSearchFilter } = useContent()
  const [input, setInput] = useState<any>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (input.length > 0) {
      const normalize = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

      const result = influencerList?.filter(item => normalize(item.full_name).includes(normalize(input)))

      setSearchFilter(result)
    } else setSearchFilter(influencerList)
  }

  return (
    <div className='mt-24 flex flex-col items-center'>
      <p className='text-xl m-2'>¿Cuál es tu influenciador favorito?</p>
      <form className='flex' onSubmit={handleSubmit}>
        <input onChange={(e: any) => setInput(e.target.value)} value={input} className='bg-dark_bg outline-none p-3 w-[500px] [@media(min-width:800px)]:focus:w-[600px] transition-all rounded-l-lg [@media(max-width:800px)]:w-[300px]' placeholder='Buscar...' type='text' />
        <button className='bg-dark_bg p-3 rounded-r-lg'>
          <Image src='./icons/search.svg' width='30' height='30' alt='search.svg' />
        </button>
      </form>
    </div>
  )
}
