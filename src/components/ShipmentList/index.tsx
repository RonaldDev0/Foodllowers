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
  const shipments: IShipment[] = [
    {
      id: '1',
      influencerId: '1',
      kitchenId: '1',
      productId: '1',
      productName: 'Hamburguer',
      preview: './img/pato404.svg',
      description: 'This is awesome Hamburguer'
    },
    {
      id: '2',
      influencerId: '2',
      kitchenId: '2',
      productId: '2',
      productName: 'Pizza',
      preview: './img/pato404.svg',
      description: 'This is awesome Pizza'
    },
    {
      id: '3',
      influencerId: '3',
      kitchenId: '3',
      productId: '3',
      productName: 'Salchipapa',
      preview: './img/pato404.svg',
      description: 'This is awesome Salchipapa'
    },
    {
      id: '4',
      influencerId: '4',
      kitchenId: '4',
      productId: '4',
      productName: 'Hot Dog',
      preview: './img/pato404.svg',
      description: 'This is awesome Hot Dog'
    }
  ]

  return (
    <div className='flex flex-col gap-4'>
      {
        shipments.map((shipment) => <ShipmentCard key={shipment.id} shipment={shipment} />)
      }
    </div>
  )
}
