'use client'
import Image from 'next/image'
import { useSupabase } from '../supabaseProvider'
import { useUser } from '@/context'

import type { ICard } from './ListCards'

export default function Card ({ id, name, lastName, number, expiration, cvv }: ICard) {
  const { supabase } = useSupabase()
  const { setCards } = useUser()

  const remove = async () => {
    await supabase.from('cards').delete().eq('id', id).then(() => {
      setCards((prevState: any) => prevState.filter((item: any) => item.id !== id))
    })
  }

  return (
    <>
      <div className='bg-dark_bg m-5 p-2 rounded w-[330px] flex justify-between'>
        <div>
          <span className='text-dark_gray'>{name}</span>
          <p className='text-lg font-medium'>{number}</p>
        </div>
        <div className='flex items-center'>
          <Image onClick={remove} className='m-3 cursor-pointer' width='25' height='25' src='./icons/x.svg' alt='close-icon' priority />
        </div>
      </div>
    </>
  )
}
