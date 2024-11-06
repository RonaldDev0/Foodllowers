'use client'
import { Card, CardBody, Avatar, Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export function ProductCard ({ item }: { item: any }) {
  return (
    <Link href={`/checkout?q=${item.id}`} key={item.id}>
      <Card className='border border-white border-opacity-10 w-96 [@media(max-width:365px)]:!w-80'>
        <CardBody className='p-0 flex flex-row'>
          <Image
            src={item.preview}
            width='800'
            height='800'
            alt='preview'
            className='w-[160px] h-[150px]'
          />
          {!item?.state && (
            <Chip color='warning' className='dark:text-white opacity-90 absolute m-2'>
              Agotado
            </Chip>
          )}
          <div className='p-4 flex flex-col justify-between items-center w-full'>
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
              {item.price.toLocaleString('es-Es', {
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
