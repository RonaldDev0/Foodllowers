import { Card, CardHeader, CardBody, Avatar, Divider } from '@nextui-org/react'
import { Stepper } from './Stepper'
import Image from 'next/image'
import Link from 'next/link'

type props = {
  activeStep: string
  product: any
}

const steps = ['buscando cocina...', 'cocinando...', 'buscando delivery...', 'recogiendo...', 'entregando...', 'entregado']

export function CardData ({ activeStep, product }: props) {
  if (!product) {
    return
  }
  return (
    <Card>
      <CardHeader className='p-0'>
        <div className='flex-col'>
          <Image
            src={product.preview}
            width='200'
            height='200'
            alt='preview'
            className='w-96'
          />
          <div className='flex items-center p-3 gap-4'>
            <Link href={product.influencers?.full_name}>
              <Avatar src={product.influencers?.avatar} />
            </Link>
            <div className='flex flex-col'>
              <p className='font-bold'>
                {product.name}
              </p>
              <p className='opacity-60'>{product.influencers.full_name}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='p-6 w-96'>
        <Stepper activeStep={steps.indexOf(activeStep)} steps={steps} />
      </CardBody>
    </Card>
  )
}
