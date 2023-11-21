import { Card, CardBody, Avatar } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

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
      path: string
      preview: string | undefined
      full_name: string
    }
  }
}

export function ProductDetails ({ product }: Props) {
  return (
    <Card>
      <CardBody className='p-0'>
        <div className='flex [@media(max-width:800px)]:flex-col'>
          <Image
            src={product.preview}
            width='200'
            height='200'
            alt='preview'
            className='w-[240px] aspect-video [@media(max-width:800px)]:w-full'
          />
          <div className='flex items-center p-3 gap-4'>
            <Link href={product.influencers?.path}>
              <Avatar src={product.influencers?.preview} />
            </Link>
            <div className='flex flex-col'>
              <p className='font-bold'>
                {product.name}
              </p>
              <p>
                {product.description}
              </p>
              <p className='opacity-60'>{product.influencers.full_name}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
