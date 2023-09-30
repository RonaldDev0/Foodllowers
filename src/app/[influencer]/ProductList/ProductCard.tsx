'use client'
import { Card, CardBody, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { BuyModal } from './BuyModal'

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
  const { price, name, description } = product
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Card>
        <CardBody onClick={onOpen} className='p-3 cursor-pointer'>
          <Image src='./img/pato404.svg' width='200' height='200' alt='preview' />
          <p className='text-xl'>{name}</p>
          <p className='text-dark_gray'>{description}</p>
          <p className='font-bold text-green-600'>${price.toLocaleString()}</p>
        </CardBody>
      </Card>
      <BuyModal product={product} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
