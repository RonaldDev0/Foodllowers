'use client'
import { useUser } from '@/context'
import { AddressElement, useElements } from '@stripe/react-stripe-js'
import { useUserPayment } from '@/store'
import { useSupabase } from '@/app/supabaseProvider'

export function Form ({ setToggleComponent, setToggleComponentContainer }: { setToggleComponent: Function, setToggleComponentContainer: Function }) {
  const { user, userId } = useUser()
  const { addressList, setStore } = useUserPayment()
  const elements = useElements()
  const { supabase } = useSupabase()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const address = await elements?.getElement(AddressElement)?.getValue() as any

    if (address.complete) {
      supabase.from('adresses').insert({ user_id: userId, address: JSON.stringify(address) }).then(() => {
        setStore('addressList', [...addressList, address])
        setStore('addressSelect', address)
        setToggleComponentContainer('Cards')
      })
    }
  }
  return (
    <div className='text-center flex flex-col gap-4'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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
        <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl'>Siguiente</button>
      </form>
      <p className='cursor-pointer' onClick={() => setToggleComponent('List')}>Ya tienes una direccion?</p>
    </div>
  )
}
