import { Card, CardBody, Avatar, Chip } from '@nextui-org/react'
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
    price: number,
    state: boolean,
    influencers: {
      avatar: string
      path: string
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
            className='w-72 aspect-video [@media(max-width:800px)]:w-full'
          />
          {!product?.state && (
            <Chip color='warning' className='dark:text-white opacity-90 absolute m-2'>
              Agotado
            </Chip>
          )}
          <div className='flex flex-col p-4 gap-4'>
            <p className='font-bold text-lg'>
              {product.name}
            </p>
            <div className='flex gap-4 items-center'>
              <Link href={'/' + product.influencers?.full_name}>
                <Avatar
                  src={product.influencers?.avatar}
                  className='w-14 h-14'
                />
              </Link>
              <p className='opacity-60'>{product.influencers.full_name}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
