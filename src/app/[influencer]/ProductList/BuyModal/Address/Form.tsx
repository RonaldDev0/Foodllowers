'use client'
import { useUser } from '@/context'
import { AddressElement } from '@stripe/react-stripe-js'

export function Form ({ setToggleComponent }: { setToggleComponent: Function }) {
  const { user } = useUser()
  return (
    <div className='text-center flex flex-col gap-4'>
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
      {/* <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl'>Siguiente</button> */}
      <p className='cursor-pointer' onClick={() => setToggleComponent('List')}>Ya tienes una direccion?</p>
    </div>
  )
}
