import Image from 'next/image'
import type { IShipment } from './index'

export function ShipmentCard ({ shipment }: { shipment: IShipment }) {
  const { preview, productName, description } = shipment

  return (
    <div className='flex items-center bg-bg_card rounded-lg p-3 hover:bg-bg_card_hover transition-all cursor-pointer'>
      <Image src={preview} alt={productName} width={200} height={200} className='h-[100px]' />
      <div>
        <p className='text-lg font-bold'>{productName}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}
