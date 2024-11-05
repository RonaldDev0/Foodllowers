'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody, Avatar, Chip, Skeleton } from '@nextui-org/react'
import { useContent } from '@/store'
import { useComission } from '@/hooks'

export function ProductCard ({ product, onOpen }: { product: any, onOpen: () => void }) {
  const { setStore } = useContent()

  return (
    <Link
      href={product.state ? `/checkout?q=${product.id}` : ''}
      key={product.id}
      onClick={() => setStore('currentProduct', product)}
    >
      <Card className='border border-white border-opacity-10'>
        <CardBody
          className='p-0'
          onClick={() => !product?.state && onOpen()}
        >
          <Skeleton isLoaded={!!product?.preview} className='w-[350px] h-[280px]'>
            <Image
              src={product.preview}
              width='800'
              height='800'
              alt='preview'
              className='w-[350px] h-[280px]'
            />
          </Skeleton>
          {!product?.state && (
            <Chip
              color='warning'
              className='dark:text-white opacity-90 absolute m-2'
            >
              Agotado
            </Chip>
          )}
          <div className='p-4 flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <Skeleton isLoaded={!!product?.influencers?.avatar} className='rounded-full w-10 h-10'>
                <Link href={'/' + product.influencers.full_name}>
                  <Avatar src={product.influencers.avatar} />
                </Link>
              </Skeleton>
              <div>
                <Skeleton isLoaded={!!product?.name} className='rounded-lg'>
                  <p className='text-xl'>
                    {product.name}
                  </p>
                </Skeleton>
                <Skeleton isLoaded={!!product?.influencers?.full_name} className='rounded-lg'>
                  <p className='opacity-60'>
                    {product.influencers.full_name}
                  </p>
                </Skeleton>
              </div>
            </div>
            <Skeleton isLoaded={!!product?.price} className='rounded-lg'>
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
            </Skeleton>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
