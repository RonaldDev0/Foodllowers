'use client'
import { useUserPayment } from '@/store'
import { CardAddress } from './CardAddress'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

import { AddressForm } from './AddressForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Adresses () {
  const { addressList } = useUserPayment()

  const [addModal, setAddModal] = useState<boolean>(false)

  return (
    <Elements stripe={stripePromise} options={{ appearance: { theme: 'night' } }}>
      <div className='w-full h-screen flex flex-col top-12 justify-center items-center gap-8'>
        {addressList.length > 0 && addressList.map(item => <CardAddress key={item.id} item={item} />)}
        <button onClick={() => setAddModal(true)} className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl'>Agregar direccion</button>
        {addModal && <AddressForm setAddModal={setAddModal} />}
      </div>
    </Elements>
  )
}
