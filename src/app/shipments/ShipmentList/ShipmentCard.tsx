/* eslint-disable camelcase */
import Image from 'next/image'
import { Card, CardBody, Avatar } from '@nextui-org/react'

export function ShipmentCard ({ shipment }: { shipment: any }) {
  const { product: { name, price, preview, influencers: { avatar, full_name } } } = shipment

  return (
    <Card>
      <CardBody className='p-0'>
        <div className='flex items-center gap-5 rounded-lg cursor-pointer'>
          <Image
            src={preview}
            alt={name}
            width={150}
            height={200}
            className='h-[150px] w-[200px]'
          />
          <div className='mr-5 flex flex-col gap-2'>
            <p className='text-lg'>
              {name}
            </p>
            <div className='flex gap-2 justify-center items-center'>
              <Avatar src={avatar} />
              <p className='opacity-50'>{full_name}</p>
            </div>
            <p className='opacity-50'>
              {price.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
