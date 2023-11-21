import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export type IProductCard = {
  id: number
  id_influencer: number
  id_kitchen: number
  category: string
  price: number
  preview: string
  name: string
  description: string
}

export function ProductCard ({ product }: { product: IProductCard }) {
  return (
    <Link href={`/checkout?q=${product.id}`}>
      <Card>
        <CardBody className='p-0 cursor-pointer'>
          <Image
            src={product.preview}
            width='200'
            height='200'
            alt='preview'
            className='w-[350px] h-[200px]'
          />
          <div className='p-3 flex justify-between items-center'>
            <div>
              <p className='text-xl'>
                {product.name}
              </p>
              <p className='opacity-60'>
                {product.description}
              </p>
            </div>
            <p className='font-bold text-green-600'>
              ${product.price.toLocaleString()}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
