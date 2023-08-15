'use client'
import { useUserPayment } from '@/store'
import { useSupabase } from '../supabaseProvider'

export function CardAddress ({ item }: any) {
  const { filter, addressList } = useUserPayment()
  const { supabase } = useSupabase()

  const { id, value: { name, phone, address: { line1, city } } } = item

  const remove = () => {
    supabase.from('adresses').delete().eq('id', id).then(({ error }) => error === null && filter('addressList', addressList.filter((item: any) => item.id !== id)))
  }

  return (
    <div className='bg-bg_card hover:bg-bg_card_hover transition-all rounded-lg p-4 w-72 flex flex-col gap-4'>
      <div className='flex w-full justify-between'>
        <p>{name}</p>
        <p>{phone}</p>
      </div>
      <div className='w-full flex justify-between'>
        <div>
          <p>{city}</p>
          <p>{line1}</p>
        </div>
        <button className='bg-red-500 text-white p-2 rounded-lg' onClick={remove}>Borrar</button>
      </div>
    </div>
  )
}
