'use client'
import { useState, useEffect } from 'react'
import { useSupabase } from '../Providers'
import { EmptyCard } from './EmptyCard'
import { CardData } from './CardData'
import { useUser } from '@/store'

export default function CurrentShipment () {
  const { supabase } = useSupabase()
  const { userId } = useUser()

  const [activeStep, setActiveStep] = useState(null)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!userId) return

    supabase
      .from('orders')
      .select('id, product, order_state, payment_status')
      .eq('user_id', userId)
      .eq('payment_status', 'approved')
      .then(({ data }: any) => {
        if (!data?.length) return
        setProduct(data[0].product)
        setActiveStep(data[0].order_state)

        supabase.channel('orders')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${userId}` },
            ({ new: { order_state: orderState, payment_status: paymentStatus }, eventType }: any) => {
              if (paymentStatus === 'approved') {
                setActiveStep(orderState)
                return
              }
              if (eventType === 'DELETE') {
                setActiveStep(null)
                setProduct(null)
              }
            }
          ).subscribe()
      })
  }, [userId])

  return (
    <div className='h-screen grid place-content-center'>
      {activeStep
        ? <CardData
            activeStep={activeStep}
            product={product}
          />
        : <EmptyCard />}
    </div>
  )
}
