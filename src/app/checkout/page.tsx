'use client'
import { useSearchParams } from 'next/navigation'
import { useSupabase } from '../Providers'
import { useState, useEffect } from 'react'
import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import { PaymentForm } from './PaymentForm'

export default function Checkout () {
  const query = useSearchParams().get('q')
  const { supabase } = useSupabase()

  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('products')
      .select('id, id_influencer, id_kitchen, category, preview, name, description, price')
      .eq('id', query)
      .then(res => setProduct(res.data && res.data[0]))
  }, [query])

  return (
    <>
      {
        product && (
          <div className='flex flex-col items-center gap-10 mt-24'>
            <Card>
              <CardBody className='p-3'>
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
            <PaymentForm
              amount={product.price}
              description={product.name}
            />
          </div>
        )
      }
    </>
  )
}
