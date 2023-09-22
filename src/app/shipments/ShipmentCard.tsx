import Image from 'next/image'

export function ShipmentCard ({ shipment }: any) {
  const { product: { name, description, price } } = shipment

  return (
    <div className='flex items-center rounded-lg p-3 cursor-pointer'>
      <Image src='./img/pato404.svg' alt={name} width={200} height={200} className='h-[100px]' />
      <div>
        <p className='text-lg font-bold'>{name}</p>
        <p>{description}</p>
        <p className='text-green-600'>{price.toLocaleString()}</p>
      </div>
    </div>
  )
}
