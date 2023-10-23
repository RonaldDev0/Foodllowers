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
        <CardBody className='p-3 cursor-pointer'>
          <Image
            src='./img/pato404.svg'
            width='200'
            height='200'
            alt='preview'
          />
          <p className='text-xl'>
            {product.name}
          </p>
          <p className='text-dark_gray'>
            {product.description}
          </p>
          <p className='font-bold text-green-600'>
            ${product.price.toLocaleString()}
          </p>
        </CardBody>
      </Card>
    </Link>
  )
}
