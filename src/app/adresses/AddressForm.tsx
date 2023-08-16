'use client'
import { AddressElement, useElements } from '@stripe/react-stripe-js'
import { useUser } from '@/context'
import { useSupabase } from '@/app/supabaseProvider'
import { useUserPayment } from '@/store'
import Image from 'next/image'

export function AddressForm ({ setAddModal }: { setAddModal: Function }) {
  const elements = useElements()
  const { supabase } = useSupabase()
  const { user, userId } = useUser()
  const { setStore } = useUserPayment()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const address = await elements?.getElement(AddressElement)?.getValue() as any

    if (address.complete) {
      supabase.from('adresses').insert({ user_id: userId, address: JSON.stringify(address) })
        .then(() => {
          supabase.from('adresses').select('*').order('id').then(({ data }) => {
            setStore('addressList', data?.map(({ address, id: _id }: any) => ({ ...JSON.parse(address), id: _id })))
          }).then(() => setAddModal(false))
        })
    }
  }

  return (
    <div className='fixed top-0 left-0 z-50 flex justify-center items-center h-screen w-screen bg-black bg-opacity-30'>
      <form onSubmit={handleSubmit} className='bg-bg p-8 rounded-md flex flex-col gap-4'>
        <div className='w-full flex justify-end'>
          <Image className='cursor-pointer' src='icons/x.svg' alt='close' width={40} height={40} onClick={() => setAddModal(false)} />
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
              name: user.full_name,
              address: {
                country: 'CO',
                city: 'Bogotá'
              }
            }
          }}
        />
        <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl'>Guardar</button>
      </form>
    </div>
  )
}
