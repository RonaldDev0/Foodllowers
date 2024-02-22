'use client'
import { useSearchParams } from 'next/navigation'
import { useSupabase } from '../Providers'
import { useState, useEffect } from 'react'
import { AddressSelect } from './AddressSelect'
import { ProductDetails } from './ProductDetails'
import { PaymentForm } from './PaymentForm'
import { Tip } from './Tip'
import { Summary } from './Summary'
import { Alert } from '@/components/Alert'

export default function Checkout () {
  const query = useSearchParams().get('q')
  const { supabase } = useSupabase()

  const [product, setProduct] = useState<any>(null)
  const serviceFee = 5000
  const shippingCost = 4000
  const [tip, setTip] = useState(0)
  const [total, setTotal] = useState<any>(null)

  const [error, setError] = useState<any>(false)

  useEffect(() => {
    supabase
      .from('products')
      .select('id, id_influencer, id_kitchen, category, preview, name, description, price, state, influencers( full_name, preview, path ), kitchens( open, logo, address )')
      .eq('id', query)
      .then((res: any) => {
        if (res.data) {
          setProduct(res.data[0])
          return
        }
        setError({ message: 'Product does not exist' })
      })
  }, [])

  useEffect(() => {
    if (product) {
      setTotal((product.price + serviceFee + shippingCost + tip))
    }
  }, [product, tip])

  if (!product || !total) {
    return null
  }

  return (
    <main
      className='flex justify-center items-start gap-5 mt-16 mb-14
        [@media(max-width:800px)]:flex-col
        [@media(max-width:800px)]:items-center
        [@media(max-width:800px)]:w-96'
    >
      <div
        className='flex flex-col gap-5
          [@media(min-width:800px)]:w-[522px]'
      >
        {!product?.kitchens.open && <Alert />}
        <AddressSelect setError={setError} />
        <ProductDetails product={product} />
        <Tip setTip={setTip} amount={product.price} serviceFee={serviceFee} />
      </div>
      <div
        className='flex flex-col gap-5 top-5
          [@media(min-width:800px)]:sticky'
      >
        <Summary
          productPrice={product.price}
          serviceFee={serviceFee}
          shippingCost={shippingCost}
          tip={tip}
          total={total}
        />
        <PaymentForm
          error={error}
          amount={total}
          product={product}
          description={'Foodllowers: ' + product.name + ' - ' + product.influencers.full_name}
          kitchenOpen={product?.kitchens.open}
        />
      </div>
    </main>
  )
}
