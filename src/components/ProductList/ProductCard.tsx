'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody, Avatar, Chip } from '@nextui-org/react'
import { useContent } from '@/store'

function calculateMercadoPagoComission (amount: number) {
  const porcentajeComision = 0.0279
  const IVA = 0.19
  const costoFijo = 952.00

  const comision = amount * porcentajeComision
  const IVAComision = comision * IVA
  const totalComision = comision + IVAComision + costoFijo

  return Math.floor(totalComision + 155)
}

export function ProductCard ({ product, onOpen }: { product: any, onOpen: () => void }) {
  const { setStore, serviceFee, influencer } = useContent()
  const total = product.price + serviceFee + influencer + calculateMercadoPagoComission(product.price + serviceFee + influencer)

  return (
    <Link
      href={product.state ? `/checkout?q=${product.id}` : ''}
      key={product.id}
      onClick={() => setStore('currentProduct', product)}
    >
      <Card>
        <CardBody
          className='p-0'
          onClick={() => !product?.state && onOpen()}
        >
          <Image
            src={product.preview}
            width='200'
            height='200'
            alt='preview'
            className='w-[350px] h-[280px]'
          />
          {!product?.state && (
            <Chip
              color='warning'
              className='dark:text-white opacity-90 absolute m-2'
            >
              Agotado
            </Chip>
          )}
          <div className='p-4 flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <Link href={'/' + product.influencers.full_name}>
                <Avatar src={product.influencers.avatar} />
              </Link>
              <div>
                <p className='text-xl'>
                  {product.name}
                </p>
                <p className='opacity-60'>
                  {product.influencers.full_name}
                </p>
              </div>
            </div>
            <p className='opacity-80'>
              {
                (total + total * 0.01108).toLocaleString('es-Es', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                  useGrouping: true
                })
              }
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
