'use client'
import { useSupabase } from '../../Providers'
import { useUser } from '@/store'
import { indexedDB } from '@/indexedDB'
import { Button } from '@nextui-org/react'

export function UpdateDataButton () {
  const { supabase } = useSupabase()
  const { userId, setStore } = useUser()

  const updateIndexedDB = () => {
    indexedDB.shipmentList.clear().then(() => {
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
    })
  }

  return (
    <Button
      onClick={updateIndexedDB}
      color='secondary'
      className='w-full'
    >
      Update
    </Button>
  )
}
