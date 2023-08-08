'use client'
import { AddressElement } from '@stripe/react-stripe-js'

export function Form () {
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <AddressElement
        className='bg-gray-900 p-4 rounded-md'
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
            name: 'Juan',
            address: {
              country: 'CO',
              city: 'Bogotá'
            }
          }
        }}
      />
    </form>
  )
}
