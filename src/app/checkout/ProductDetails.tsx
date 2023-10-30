import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'

type Props = {
  product: {
    id: string,
    id_influencer: string,
    id_kitchen: string,
    category: string,
    preview: string,
    name: string,
    description: string,
    price: number,
    influencers: {
      full_name: string
    }
  }
}

export function ProductDetails ({ product }: Props) {
  return (
    <Card>
      <CardBody className='p-3'>
        <div className='flex'>
          <Image
            src='./img/pato404.svg'
            width='200'
            height='200'
            alt='preview'
          />
          <div className='flex flex-col gap-8 p-4'>
            <p className='font-bold'>
              {product.name + ' - ' + product.influencers.full_name}
            </p>
            <p>
              {product.description}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
