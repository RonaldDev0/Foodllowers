/* eslint-disable camelcase */
'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSupabase } from '../Providers'
import { EmptyCard } from './EmptyCard'
import { CardData } from './CardData'
import { useUser } from '@/store'

export default function CurrentShipment () {
  const query = useSearchParams().get('payment_id')
  const { supabase } = useSupabase()
  const { userId } = useUser()

  const [activeStep, setActiveStep] = useState(null)
  const [product, setProduct] = useState(null)

  function subscribeChannel () {
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
  }

  useEffect(() => {
    if (!query || !userId) return

    fetch('/api/search_payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: query })
    })
      .then(res => res.json())
      .then(({ id, status, error, mercadopago }) => {
        if (error) return

        supabase
          .from('orders')
          .select('transaction_amount')
          .eq('user_id', userId)
          .eq('invoice_id', id)
          .then(({ data, error }) => {
            if (error) return
            const transaction_amount = data[0].transaction_amount
            const earnings = transaction_amount.earnings + (transaction_amount.mercadopago - mercadopago)

            const newTransactionAmount = { ...transaction_amount, mercadopago, earnings }

            switch (status) {
              case 'approved':
                supabase
                  .from('orders')
                  .update({ payment_status: 'approved', transaction_amount: newTransactionAmount })
                  .eq('invoice_id', id)
                  .eq('user_id', userId)
                  .select('*, influencers(full_name, avatar)')
                  .then(({ data }: any) => {
                    if (!data?.length) return
                    setProduct(data[0])
                    setActiveStep(data[0].order_state)

                    subscribeChannel()
                  })
                break
              case 'rejected':
                supabase
                  .from('orders')
                  .delete()
                  .eq('invoice_id', id)
                  .eq('user_id', userId)
                  .then(() => console.log('.'))
                break
              default:
                break
            }
          })
      })
  }, [userId, query])

  useEffect(() => {
    if (!userId || query) return

    supabase
      .from('orders')
      .select('*, influencers(full_name, avatar)')
      .eq('user_id', userId)
      .eq('payment_status', 'approved')
      .then(({ data }: any) => {
        if (!data?.length) return
        setProduct(data[0])
        setActiveStep(data[0].order_state)

        subscribeChannel()
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
