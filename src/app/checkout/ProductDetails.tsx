import { Card, CardBody, Avatar, Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { PlusCircle, MinusCircle } from 'lucide-react'

type Props = {
  numberOfProducts: number,
  setNumberOfProducts: Function
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

export function ProductDetails ({ product, numberOfProducts, setNumberOfProducts }: Props) {
  const minus = () => {
    if (numberOfProducts > 1) {
      setNumberOfProducts(numberOfProducts - 1)
    }
  }

  const plus = () => {
    if (numberOfProducts < 5) {
      setNumberOfProducts(numberOfProducts + 1)
    }
  }

  return (
    <Card>
      <CardBody className='p-0'>
        <div className='flex [@media(max-width:800px)]:flex-col'>
          <Image
            src={product.preview}
            width='200'
            height='200'
            alt='preview'
            className='w-72 aspect-video [@media(max-width:800px)]:w-full h-[280px]'
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
            <div className='flex flex-col justify-center items-center gap-6 w-full h-full'>
              <p>cantidad:</p>
              <div className='flex gap-4 items-center justify-center h-full w-full'>
                <MinusCircle
                  size={30}
                  className={`cursor-pointer ${numberOfProducts === 1 ? 'opacity-50' : ''} transition-all`}
                  onClick={minus}
                />
                <p>{numberOfProducts}</p>
                <PlusCircle
                  size={30}
                  className={`cursor-pointer ${numberOfProducts === 5 ? 'opacity-50' : ''} transition-all`}
                  onClick={plus}
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
