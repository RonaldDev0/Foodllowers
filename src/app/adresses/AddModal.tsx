'use client'
import { useState } from 'react'
import { useSupabase } from '../supabaseProvider'

import Image from 'next/image'
import { useUser } from '@/context'

type props = {
  setOpen: Function
}

type IAdress = {
  user_id: any
  name: string
  address: string
}

export default function AddModal ({ setOpen }: props) {
  const { supabase } = useSupabase()
  const { userId, setAdresses } = useUser()

  const [adress, setAdress] = useState<IAdress>({ user_id: userId, name: '', address: '' })

  const handleChageName = ({ target: { value } }: any) => setAdress(prevState => ({ ...prevState, name: value }))
  const handleChangeAdress = ({ target: { value } }: any) => setAdress(prevState => ({ ...prevState, address: value }))

  const addAddress = async () => {
    await supabase.from('adresses').insert([adress]).then(() => {
      supabase.from('adresses').select('*').order('id').then(({ data }) => setAdresses(data))
      setAdress({ user_id: userId, name: '', address: '' })
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
          <input onChange={handleChangeAdress} type='text' placeholder='Adress' className='bg-gray rounded p-2 text-black outline-none' />
          <button onClick={addAddress} className='bg-green-600 p-2 mt-5 rounded text-xl w-[300px]'>Add</button>
        </form>
      </div>
    </div>
  )
}
