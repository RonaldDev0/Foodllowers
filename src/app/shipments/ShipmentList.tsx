'use client'

import { useUserPayment } from '@/store'
import { ShipmentCard } from './ShipmentCard'

export type IShipment = {
  id: string
  influencerId: string
  kitchenId: string
  productId: string
  productName: string
  preview: string
  description: string
}

export function ShipmentList () {
  const { shipmentList } = useUserPayment()

  return (
    <div className='flex flex-col gap-4'>
      {
        shipmentList.map(shipment => <ShipmentCard key={shipment.id} shipment={shipment} />)
      }
    </div>
  )
}
