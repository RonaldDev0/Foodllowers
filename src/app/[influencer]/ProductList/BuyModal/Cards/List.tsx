'use client'
import { useUserPayment } from '@/store'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStripe } from '@stripe/react-stripe-js'

function Card ({ item }: any) {
  const { number, cvv, expiration } = item
  const { setStore, cardSelect } = useUserPayment()

  const handleClick = () => {
    setStore('cardSelect', item)
  }

  return (
    <div className={`${cardSelect?.number === number && 'border border-green-500 bg-zinc-900'} rounded-md p-4 bg-zinc-900 cursor-pointer transition-all`} onClick={handleClick}>
      <h1>{number}</h1>
      <p>{cvv}</p>
      <p>{expiration}</p>
    </div>
  )
}

export function List ({ setToggleComponent, currentProduct }: any) {
  const router = useRouter()
  const { cardList } = useUserPayment()
  const { addressSelect: address, cardSelect } = useUserPayment()
  const stripe = useStripe()

  const [button, setButton] = useState<string>('Pagar')
  const [error, setError] = useState<string | null>(null)

  const fetchWithOutForm = async () => {
    if (address?.complete && cardSelect) {
      setButton('Loading...')
      const clientSecret = await fetch(process.env.NEXT_PUBLIC_STRIPE_FETCH_PATH!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct.price)
      }).then(res => res.json())

      const { error, paymentIntent }: any = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardSelect,
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
    <>
      <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4 text-center'>
        {cardList.map(item => <Card key={item.number} item={item} />)}
        {cardList.length === 0 ? <p className='text-xl w-56 m-10'>No tienes ninguna targeta registrada </p> : <button className='bg-zinc-900 hover:bg-zinc-700 transition-all p-2 rounded-md text-2xl' onClick={fetchWithOutForm}>{button}</button>}
        {error && <p>{error}</p>}
      </form>
      <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl' onClick={() => setToggleComponent('Form')}>Agregar una targeta</button>
    </>
  )
}
