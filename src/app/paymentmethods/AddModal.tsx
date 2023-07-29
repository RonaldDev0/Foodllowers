'use client'
import { useState } from 'react'
import { useSupabase } from '../supabaseProvider'

import Image from 'next/image'
import { useUser } from '@/store'

type props = {
  setOpen: Function
}

export type ICard = {
  user_id: any
  name: string
  lastName: string
  number: string
  expiration: any
  cvv: string
}

export default function AddModal ({ setOpen }: props) {
  const { supabase } = useSupabase()
  const { userId, setCards } = useUser()

  const [card, setCard] = useState<ICard>({ user_id: userId, name: '', lastName: '', number: '', expiration: '', cvv: '' })

  const handleChageName = ({ target: { value } }: any) => setCard(prevState => ({ ...prevState, name: value }))
  const handleChangeAdress = ({ target: { value } }: any) => setCard(prevState => ({ ...prevState, lastName: value }))
  const handleChangeNumber = ({ target: { value } }: any) => setCard(prevState => ({ ...prevState, number: value }))
  const handleChangeExpiration = ({ target: { value } }: any) => setCard(prevState => ({ ...prevState, expiration: value }))
  const handleChangeCvv = ({ target: { value } }: any) => setCard(prevState => ({ ...prevState, cvv: value }))

  const addAddress = async () => {
    await supabase.from('cards').insert([card]).then(() => {
      supabase.from('cards').select('*').order('id').then(({ data }) => setCards(data))
      setCard({ user_id: userId, name: '', lastName: '', number: '', expiration: '', cvv: '' })
      setOpen(false)
    })
  }

  return (
    <div className='w-full flex justify-center items-center h-screen bg-dark_df_bg fixed'>
      <div className='w-[380px] p-10 bg-dark_bg rounded'>
        <div className='w-full flex justify-end'>
          <Image className=' cursor-pointer text-white' onClick={() => setOpen(false)} src='./icons/x.svg' alt='close-icon' width='40' height='40' priority />
        </div>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-5 my-10'>
          <input onChange={handleChageName} type='text' placeholder='Name' className='bg-gray rounded p-2 text-black outline-none' />
          <input onChange={handleChangeAdress} type='text' placeholder='lastName' className='bg-gray rounded p-2 text-black outline-none' />
          <input onChange={handleChangeNumber} type='text' placeholder='number' className='bg-gray rounded p-2 text-black outline-none' />
          <input onChange={handleChangeExpiration} type='text' placeholder='expiration' className='bg-gray rounded p-2 text-black outline-none' />
          <input onChange={handleChangeCvv} type='text' placeholder='cvv' className='bg-gray rounded p-2 text-black outline-none' />

          <button onClick={addAddress} className='bg-green-600 p-2 mt-5 rounded text-xl w-[300px]'>Add</button>
        </form>
      </div>
    </div>
  )
}
