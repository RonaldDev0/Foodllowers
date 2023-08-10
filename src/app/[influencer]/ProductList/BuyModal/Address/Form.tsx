'use client'
import { useUser } from '@/context'
import { AddressElement, useElements } from '@stripe/react-stripe-js'
import { useUserPayment } from '@/store'

export function Form ({ setToggleComponent, setToggleComponentContainer }: { setToggleComponent: Function, setToggleComponentContainer: Function }) {
  const { user } = useUser()
  const { addressList, setStore } = useUserPayment()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const address = await elements?.getElement(AddressElement)?.getValue() as any

    if (address.complete) {
      setStore('addressList', [...addressList, address])
      setStore('addressSelect', address)
      setToggleComponentContainer('Cards')
    }
  }
  return (
    <>
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
        <button className='bg-zinc-900 hover:bg-zinc-700 transition-all p-2 rounded-md text-2xl'>Siguiente</button>
      </form>
      <button className='bg-slate-900 hover:bg-slate-700 transition-all p-2 rounded-md text-2xl' onClick={() => setToggleComponent('List')}>Ya tienes una direccion?</button>
    </>
  )
}
