'use client'
import { useEffect } from 'react'
import { useSupabase } from '../../Providers'
import { useUser } from '@/store'
import { ShipmentCard } from './ShipmentCard'
import { indexedDB } from '@/indexedDB'
import { useLiveQuery } from 'dexie-react-hooks'

export default function ShipmentList () {
  const { supabase } = useSupabase()
  const { userId, shipmentList, setStore } = useUser()
  const shipmentListQuery = useLiveQuery(() => indexedDB.shipmentList.toArray())

  function updateIndexedDB () {
    supabase
      .from('shipments')
      .select('id, product')
      .eq('user_id', userId)
      .eq('payment_status', 'approved')
      .then(({ data, error }) => {
        if (error) return
        setStore('shipmentList', data)
        data.map(item => (
          indexedDB.shipmentList.add(item as any)
        ))
      })
  }

  useEffect(() => {
    if (!userId || !shipmentListQuery || shipmentList) return

    if (shipmentListQuery.length > 0) {
      setStore('shipmentList', shipmentListQuery)
      return
    }

    updateIndexedDB()
  }, [userId, shipmentListQuery])

  return (
    <div className='flex flex-col gap-4'>
      {shipmentList?.map((shipment) => (
        <ShipmentCard
          key={shipment.id}
          shipment={shipment}
        />
      ))}
    </div>
  )
}
