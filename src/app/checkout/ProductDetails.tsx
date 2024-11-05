import { Card, CardBody, Avatar, Chip, Divider } from '@nextui-org/react'
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
    <Card className='border border-white border-opacity-10'>
      <CardBody className='p-0'>
        <div className='flex-col'>
          <div className='flex'>
            <Image
              src={product.preview}
              width='800'
              height='800'
              alt='preview'
              className='w-[250px] h-[162px] [@media(max-width:800px)]:w-[160px] [@media(max-width:800px)]:h-[140px]'
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
          <Divider />
          <div className='flex items-center justify-around w-full my-3'>
            <p>cantidad:</p>
            <div className='flex gap-4 items-center justify-center'>
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
      </CardBody>
    </Card>
  )
}
