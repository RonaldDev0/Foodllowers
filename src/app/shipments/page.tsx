/* eslint-disable camelcase */
'use client'
import { useEffect } from 'react'
import { useSupabase } from '../Providers'
import { useUser } from '@/store'
import { ShipmentCard } from './ShipmentCard'

export default function Shipments () {
  const { supabase } = useSupabase()
  const { userId, shipmentList, setStore } = useUser()

  useEffect(() => {
    if (userId && !shipmentList) {
      supabase
        .from('shipments')
        .select('id, product')
        .eq('user_id', userId)
        .eq('payment_status', 'approved')
        .then(({ data, error }) => {
          if (error) {
            return
          }
          setStore('shipmentList', data)
        })
    }
  }, [userId])

  return (
    <div className='w-full flex flex-col top-12 justify-around items-center'>
      <div className='flex flex-col gap-4'>
        {shipmentList?.map((shipment) => (
          <ShipmentCard
            key={shipment.id}
            shipment={shipment}
          />
        ))}
      </div>
    </div>
  )
}
