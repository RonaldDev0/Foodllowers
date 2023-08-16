'use client'
import { useUserPayment } from '@/store'
import { useSupabase } from '../supabaseProvider'
import { useState } from 'react'

import { AddressEdit } from './AddressEdit'

export function CardAddress ({ item }: any) {
  const { filter, addressList } = useUserPayment()
  const { supabase } = useSupabase()
  const [editModal, setEditModal] = useState<boolean>(false)

  const { id, value: { name, phone, address: { line1, city } } } = item

  const remove = () => {
    supabase.from('adresses').delete().eq('id', id).then(({ error }) => error === null && filter('addressList', addressList.filter((item: any) => item.id !== id)))
  }

  return (
    <>
      <div className='bg-bg_card hover:bg-bg_card_hover transition-all rounded-lg p-4 w-72 flex flex-col gap-4'>
        <div className='flex w-full justify-between'>
          <p className='font-bold'>{name}</p>
          <p>{phone.slice(3)}</p>
        </div>
        <div className='w-full flex justify-between'>
          <div>
            <p>{city}</p>
            <p>{line1}</p>
          </div>
          <div className='flex gap-2 h-8'>
            <button className='bg-red-500 px-2 rounded-lg' onClick={remove}>Borrar</button>
            <button className='bg-blue-500 px-2 rounded-lg' onClick={() => setEditModal(true)}>Editar</button>
          </div>
        </div>
      </div>
      {editModal && <AddressEdit setEditModal={setEditModal} item={item} />}
    </>
  )
}
