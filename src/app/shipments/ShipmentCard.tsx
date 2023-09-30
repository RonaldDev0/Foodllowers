'use client'
import Image from 'next/image'
import { Card, CardBody } from '@nextui-org/react'

export function ShipmentCard ({ shipment }: any) {
  const { product: { name, description, price } } = shipment

  return (
    <Card>
      <CardBody className='p-0'>
        <div className='flex items-center gap-5 rounded-lg p-3 cursor-pointer'>
          <Image src='./img/pato404.svg' alt={name} width={150} height={200} className='h-[100px]' />
          <div className='mr-5'>
            <p className='text-lg font-bold'>{name}</p>
            <p>{description}</p>
            <p className='text-green-600'>{price.toLocaleString()}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
