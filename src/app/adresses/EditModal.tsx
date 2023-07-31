'use client'
import { useState } from 'react'
import { useSupabase } from '../supabaseProvider'

import Image from 'next/image'
import { useUser } from '@/context'

type props = {
  setIsEdit: Function
  name: string
  address: string
  id: any
}

type IAdress = {
  name: string
  address: string
}

export default function EditModal ({ setIsEdit, name, address, id }: props) {
  const { supabase } = useSupabase()
  const { setAdresses } = useUser()

  const [adress, setAdress] = useState<IAdress>({ name, address })

  const handleChageName = ({ target: { value } }: any) => setAdress(prevState => ({ ...prevState, name: value }))
  const handleChangeAdress = ({ target: { value } }: any) => setAdress(prevState => ({ ...prevState, address: value }))

  const EditAddress = async () => {
    await supabase.from('adresses').update(adress).eq('id', id).then(() => {
      setAdresses((prevState: any[]) => prevState.map(item => {
        console.log(item)
        if (item.id === id) {
          return { ...item, name: adress.name, address: adress.address }
        }
        return item
      }))
      setIsEdit(false)
    })
  }

  return (
    <div className='w-full flex justify-center items-center h-screen bg-dark_df_bg fixed top-0 left-0'>
      <div className='w-[380px] p-10 bg-dark_bg rounded'>
        <div className='w-full flex justify-end'>
          <Image className=' cursor-pointer text-white' onClick={() => setIsEdit(false)} src='./icons/x.svg' alt='close-icon' width='40' height='40' priority />
        </div>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-5 my-10'>
          <input onChange={handleChageName} value={adress.name} type='text' placeholder='Nombre' className='bg-gray rounded p-2 text-black outline-none' />
          <input onChange={handleChangeAdress} value={adress.address} type='text' placeholder='Direccion' className='bg-gray rounded p-2 text-black outline-none' />
          <button onClick={EditAddress} className='bg-green-600 p-2 mt-5 rounded text-xl w-[300px]'>Editar</button>
        </form>
      </div>
    </div>
  )
}
