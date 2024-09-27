'use client'
import { Card, CardBody, Avatar, Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useContent } from '@/store'

function calculateMercadoPagoComission (amount: number) {
  const porcentajeComision = 0.0279
  const IVA = 0.19
  const costoFijo = 952.00

  const comision = amount * porcentajeComision
  const IVAComision = comision * IVA
  const totalComision = comision + IVAComision + costoFijo

  return Math.floor(totalComision + 155)
}

export function ProductCard ({ item }: { item: any }) {
  const { serviceFee, influencer } = useContent()
  const total = item.price + serviceFee + influencer + calculateMercadoPagoComission(item.price + serviceFee + influencer)

  return (
    <Link href={`/checkout?q=${item.id}`} key={item.id}>
      <Card>
        <CardBody
          className='p-0'
        >
          <Image
            src={item.preview}
            width='200'
            height='200'
            alt='preview'
            className='w-[350px] h-[280px]'
          />
          {!item?.state && (
            <Chip color='warning' className='dark:text-white opacity-90 absolute m-2'>
              Agotado
            </Chip>
          )}
          <div className='p-4 flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <Link href={item.influencers.full_name}>
                <Avatar src={item.influencers.avatar} />
              </Link>
              <div>
                <p className='text-xl'>
                  {item.name}
                </p>
                <p className='opacity-60'>{item.influencers.full_name}</p>
              </div>
            </div>
            <p className='opacity-80'>
              {(total + total * 0.01108).toLocaleString('es-Es', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: true
              })}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
