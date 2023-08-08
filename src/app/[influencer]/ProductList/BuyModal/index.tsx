'use client'
// import { AddressElement, CardElement } from '@/components'
import { useState } from 'react'
import { Modal } from './Modal'
import { AddressElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useUser } from '@/context'

export function BuyModal ({ currentProduct }: any) {
  const [Button, setButton] = useState('Buy')
  const [Error, setError] = useState(null)

  const { user } = useUser()
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const address = await elements?.getElement(AddressElement)?.getValue() as any

    if (address.complete) {
      setButton('Loading...')
      const clientSecret = await fetch('https://foodllowers.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct)
      }).then(res => res.json())

      const { error, paymentIntent }: any = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
          billing_details: await elements?.getElement(AddressElement)?.getValue().then(res => res.value) as any
        }
      })

      if (!error) {
        setError(null)
        console.log(paymentIntent)
        setButton('Success!')
      } else {
        setButton('Try again')
        setError(error.message)
      }
    }
  }
  return (
    <Modal>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96'>
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
        <CardElement
          className='bg-zinc-900 p-4 rounded-md'
          options={{
            hidePostalCode: true,
            iconStyle: 'solid',
            style: {
              base: {
                fontSize: '16px',
                color: 'white'
              }
            }
          }}
        />
        <button className='bg-zinc-900 hover:bg-zinc-700 transition-all p-2 rounded-md text-2xl'>
          {Button}
        </button>
        <p>{Error}</p>
      </form>
    </Modal>
  )
}
