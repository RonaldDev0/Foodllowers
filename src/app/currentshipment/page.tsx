'use client'
import { useState, useEffect } from 'react'
import { useSupabase } from '../Providers'
import { EmptyCard } from './EmptyCard'
import { CardData } from './CardData'
import { useUser } from '@/store'
import { useSearchParams, useRouter } from 'next/navigation'

export default function CurrentShipment () {
  const { supabase } = useSupabase()
  const [activeStep, setActiveStep] = useState(null)
  const [product, setProduct] = useState(null)
  const { userId } = useUser()
  const paymentId = useSearchParams().get('payment_id')
  const router = useRouter()

  useEffect(() => {
    if (!paymentId || !userId) {
      return
    }

    fetch('api/search_payment', {
      method: 'POST',
      body: JSON.stringify({ paymentId })
    })
      .then((res) => res.json())
      .then(({ id, status }) => {
        console.log({ status })
        if (status === 'approved') {
          // TODO: check if payment is approved
          supabase
            .from('orders')
            .update({ payment_status: status })
            .eq('user_id', userId)
            .eq('invoice_id', id)
            .select('id')
            .then(({ error }) => {
              if (error) {
                console.log('error', error)
              }
              router.push('/currentshipment')
            })
          return
        }
        if (status === 'rejected' || status === 'cancelled') {
          supabase
            .from('orders')
            .delete()
            .eq('user_id', userId)
            .eq('invoice_id', id)
            .then(() => router.push('/currentshipment'))
        }
      })
  }, [paymentId, userId])

  useEffect(() => {
    if (!userId) {
      return
    }

    supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('payment_status', 'approved')
      .then(({ data }: any) => {
        if (data?.length) {
          setProduct(data[0].product)
          setActiveStep(data[0].order_state)
        }
      })

    supabase.channel('orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${userId}` },
        ({ new: { order_state: orderState, payment_status: paymentStatus } }: any) => {
          if (paymentStatus === 'approved') {
            setActiveStep(orderState)
          }
        }
      ).subscribe()
  }, [userId])

  return (
    <div className='h-screen grid place-content-center'>
      {activeStep
        ? <CardData activeStep={activeStep} product={product} />
        : <EmptyCard />}
    </div>
  )
}
