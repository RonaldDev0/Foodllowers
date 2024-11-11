'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody, Avatar, Chip } from '@nextui-org/react'
import { useComission } from '@/hooks'

export function ProductCard ({ product, onOpen }: { product: any, onOpen: () => void }) {
  return (
    <Link
      href={product.state ? `/checkout?q=${product.id}` : ''}
      key={product.id}
    >
      <Card className='border border-white border-opacity-10 w-96 [@media(max-width:365px)]:!w-80'>
        <CardBody
          className='p-0 flex flex-row'
          onClick={() => !product?.state && onOpen()}
        >
          <Image
            src={product.preview}
            width='800'
            height='800'
            alt='preview'
            className='w-[160px] h-[140px]'
          />
          {!product?.state && (
            <Chip
              color='warning'
              className='dark:text-white opacity-90 absolute m-2'
            >
              Agotado
            </Chip>
          )}
          <div className='p-4 flex flex-col justify-around items-center'>
            <div className='flex gap-3 items-center'>
              <Link href={'/' + product.influencers.full_name}>
                <Avatar src={product.influencers.avatar} />
              </Link>
              <div>
                <p className='text-xl'>
                  {product.name}
                </p>
                <p className='opacity-40'>
                  {product.influencers.full_name}
                </p>
              </div>
            </div>
            <p className='opacity-80'>
              {
                (product.price + useComission(product.price)).toLocaleString('es-Es', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                  useGrouping: true
                })
              }
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
