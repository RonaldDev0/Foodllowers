'use client'
import { useState, useEffect } from 'react'
import { useSupabase } from '../Providers'
import { EmptyCard } from './EmptyCard'
import { CardData } from './CardData'
import { useUser } from '@/store'

const steps = ['buscando cocina...', 'cocinando...', 'buscando delivery...', 'recogiendo...', 'entregando...', 'entregado']

export default function CurrentShipment () {
  const { supabase } = useSupabase()
  const [activeStep, setActiveStep] = useState(null)
  const [product, setProduct] = useState(null)
  const { userId } = useUser()

  useEffect(() => {
    if (!userId) {
      return
    }

    supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
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
        ({ new: { order_state: orderState } }: any) => setActiveStep(orderState)
      ).subscribe()
  }, [userId])

  return (
    <div className='h-screen grid place-content-center'>
      {activeStep
        ? <CardData steps={steps} activeStep={activeStep} product={product} />
        : <EmptyCard />}
    </div>
  )
}
