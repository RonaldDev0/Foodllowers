'use client'
import { useEffect } from 'react'
import { useSupabase } from '../../Providers'
import { useUser } from '@/store'
import { ShipmentCard } from './ShipmentCard'
import { EmptyCard } from './EmptyCard'

export default function ShipmentList () {
  const { supabase } = useSupabase()
  const { userId, shipmentList, setStore } = useUser()

  useEffect(() => {
    if (!userId) return
    supabase
      .from('shipments')
      .select('id, product, transaction_amount, preferences, invoice_id')
      .eq('user_id', userId)
      .eq('payment_status', 'approved')
      .then(({ data, error }) => {
        if (error) return
        setStore('shipmentList', data)
      })
  }, [userId])

  return (
    <div className='flex flex-col gap-4'>
      {shipmentList?.map((shipment) => (
        <ShipmentCard
          key={shipment.id}
          shipment={shipment}
        />
      ))}
      {
        shipmentList?.length === 0 && (
          <EmptyCard />
        )
      }
    </div>
  )
}
