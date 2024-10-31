/* eslint-disable camelcase */
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
  if (!product) return null

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
            <Link href={product?.full_name}>
              <Avatar src={product?.avatar} />
            </Link>
            <div className='flex flex-col'>
              <p className='font-bold'>
                {product.name}
              </p>
              <p className='opacity-60'>{product?.full_name}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='p-6 w-96'>
        {
          product.pickUpInStore
            ? (
              <div className='flex flex-col gap-4'>
                {
                  activeStep === 'buscando delivery...'
                    ? <p>Ya puedes recoger tu pedido</p>
                    : <p>Tu pedido se esta cocinando</p>
                }
                <p>Codigo: {product.invoice_id.slice(-3)}</p>
                <div className='flex gap-2'>
                  <p>Dirección: </p>
                  <Link
                    href={`https://maps.google.com/?q=${product.formatted_address}`}
                    className='text-purple-800'
                    target='_blank'
                  >
                    {product.formatted_address}
                  </Link>
                </div>
              </div>
              )
            : <Stepper activeStep={steps.indexOf(activeStep)} steps={steps} />
        }
      </CardBody>
    </Card>
  )
}
