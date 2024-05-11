'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody, Avatar, Chip } from '@nextui-org/react'

const serviceFee = 2000
const influencer = 2000

export function ProductCard ({ product, onOpen }: { product: any, onOpen: () => void }) {
  return (
    <Link
      href={product.state ? `/checkout?q=${product.id}` : ''}
      key={product.id}
    >
      <Card>
        <CardBody
          className='p-0'
          onClick={() => !product?.state && onOpen()}
        >
          <Image
            src={product.preview}
            width='200'
            height='200'
            alt='preview'
            className='w-[350px] h-[200px]'
          />
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
              <Link href={product.influencers.path}>
                <Avatar src={product.influencers.avatar} />
              </Link>
              <div>
                <p className='text-xl'>
                  {product.name}
                </p>
                <p className='opacity-60'>
                  {product.influencers.full_name}
                </p>
              </div>
            </div>
            <p className='font-bold text-green-600'>
              ${(product.price + serviceFee + influencer).toLocaleString()}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
