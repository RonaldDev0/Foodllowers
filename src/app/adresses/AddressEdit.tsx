'use client'
import { AddressElement, useElements } from '@stripe/react-stripe-js'
import { useUser } from '@/context'
import { useSupabase } from '@/app/supabaseProvider'
import { useUserPayment } from '@/store'
import Image from 'next/image'

export function AddressEdit ({ setEditModal, item }: { setEditModal: Function, item: any }) {
  const elements = useElements()
  const { supabase } = useSupabase()
  const { userId } = useUser()
  const { setStore } = useUserPayment()
  const { id, value: { name, phone, address: { line1, city, state, country, postal_code: postalCode } } } = item

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const address = await elements?.getElement(AddressElement)?.getValue() as any

    if (address.complete) {
      supabase.from('adresses').update({ user_id: userId, address: JSON.stringify(address) }).eq('id', id).then(() => {
        supabase.from('adresses').select('*').order('id').then(({ data }) => {
          setStore('addressList', data?.map(({ address, id: _id }: any) => ({ ...JSON.parse(address), id: _id })))
        }).then(() => setEditModal(false))
      })
    }
  }

  return (
    <div className='fixed top-0 left-0 z-50 flex justify-center items-center h-screen w-screen bg-black bg-opacity-30'>
      <form onSubmit={handleSubmit} className='p-8 rounded-md flex flex-col gap-4'>
        <div className='w-full flex justify-end'>
          <Image className='cursor-pointer' src='icons/x.svg' alt='close' width={40} height={40} onClick={() => setEditModal(false)} />
        </div>
        <AddressElement
          className='bg-zinc-900 p-4 rounded-md'
          options={{
            mode: 'shipping',
            allowedCountries: ['CO'],
            autocomplete: {
              mode: 'automatic'
            },
            fields: {
              phone: 'always'
            },
            validation: {
              phone: {
                required: 'always'
              }
            },
            defaultValues: {
              name,
              phone: phone.slice(3),
              address: {
                country,
                city,
                line1,
                state,
                postal_code: postalCode
              }
            }
          }}
        />
        <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl'>Editar</button>
      </form>
    </div>
  )
}
