'use client'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useUserPayment } from '@/store'
import { useRouter } from 'next/navigation'

export function Form ({ currentProduct, setToggleComponent }: any) {
  const elements = useElements()
  const stripe = useStripe()
  const { addressSelect: address } = useUserPayment()
  const router = useRouter()

  const [button, setButton] = useState<string>('Buy')
  const [error, setError] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState<boolean>(false)

  const options: any = {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
        color: 'white'
      }
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (address?.complete && cardComplete) {
      setButton('Loading...')
      const clientSecret = await fetch(process.env.NEXT_PUBLIC_STRIPE_FETCH_PATH!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: currentProduct, address: address.value })
      }).then(res => res.json())

      const { error, paymentIntent }: any = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
          billing_details: address.value
        }
      })

      if (!error && paymentIntent.status === 'succeeded') {
        setError(null)
        setButton('Success!')
        router.push('/')
      } else {
        setButton('Try again')
        setError(error?.message)
      }
    }
  }

  return (
    <div className='text-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96'>
        <CardElement className='bg-zinc-900 p-4 rounded-md' options={options} onChange={e => setCardComplete(e.complete)} />
        <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl'>{button}</button>
        <p>{error}</p>
      </form>
      <p onClick={() => setToggleComponent('List')} className='cursor-pointer'>Ya tienes una targeta?</p>
    </div>
  )
}
