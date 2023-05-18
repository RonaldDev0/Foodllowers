'use client'
import Image from 'next/image'
import { useSupabase } from '../supabaseProvider'
import { useUser } from '@/context'
import { useState } from 'react'

import EditModal from './EditModal'

type IAdress = {
  id: string
  name: string
  address: string
}

export default function AdressCard ({ id, name, address }: IAdress) {
  const [isEdit, setIsEdit] = useState(false)
  const { supabase } = useSupabase()
  const { setAdresses } = useUser()

  const remove = async () => {
    await supabase.from('adresses').delete().eq('id', id).then(() => {
      setAdresses((prev: any) => prev.filter((item: any) => item.id !== id))
    })
  }

  return (
    <>
      {isEdit && <EditModal setIsEdit={setIsEdit} name={name} address={address} id={id} />}
      <div className='bg-dark_bg m-5 p-2 rounded w-[330px] flex justify-between'>
        <div>
          <span className='text-dark_gray'>{name}</span>
          <p className='text-lg font-medium'>{address}</p>
        </div>
        <div className='flex items-center'>
          <Image onClick={() => setIsEdit(true)} className='cursor-pointer' width='25' height='25' src='./icons/edit.svg' alt='edit' priority />
          <Image onClick={remove} className='m-3 cursor-pointer' width='25' height='25' src='./icons/x.svg' alt='close-icon' priority />
        </div>
      </div>
    </>
  )
}
