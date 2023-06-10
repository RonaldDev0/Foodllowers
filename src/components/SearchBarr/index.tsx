'use client'

import Image from 'next/image'

export function SearchBarr () {
  return (
    <div className='mt-24 flex flex-col items-center'>
      <p className='text-xl m-2'>What's your favorite influencer</p>
      <form className='flex' onSubmit={e => e.preventDefault()}>
        <input className='bg-dark_bg outline-none p-3 w-[500px] [@media(min-width:800px)]:focus:w-[600px] transition-all rounded-l-lg [@media(max-width:800px)]:w-[300px]' placeholder='Search...' type='text' />
        <button className='bg-dark_bg p-3 rounded-r-lg'>
          <Image src='./icons/search.svg' width='30' height='30' alt='search.svg' />
        </button>
      </form>
    </div>
  )
}
