'use client'
import { useSearchParams } from 'next/navigation'
import { useSupabase } from '../Providers'
import { useUser } from '@/store'
import { useState, useEffect } from 'react'
import { AddressSelect } from './AddressSelect'
import { ProductDetails } from './ProductDetails'
import { PaymentForm } from './PaymentForm'
import { Tip } from './Tip'
import { Summary } from './Summary'
import { Alert } from '@/components/Alert'
import { EstimationTime } from './EstimationTime'

const pricePerKm = 1000
const minima = 3000
const preparationTime = 20
const serviceFee = 2000
const influencer = 2000

function calculateMercadoPagoComission (amount: number) {
  const porcentajeComision = 0.0279
  const IVA = 0.19
  const costoFijo = 952.00

  const comision = amount * porcentajeComision
  const IVAComision = comision * IVA
  const totalComision = comision + IVAComision + costoFijo

  return Math.floor(totalComision + 155)
}

export default function Checkout () {
  const query = useSearchParams().get('q')
  const { supabase } = useSupabase()
  const { addressSelect } = useUser()

  const [estimationTime, setEstimationTime] = useState(0)
  const [product, setProduct] = useState<any>(null)
  const [shippingCost, setShippingCost] = useState(0)
  const [tip, setTip] = useState(0)
  const [total, setTotal] = useState<any>(null)

  const [error, setError] = useState<any>(false)

  useEffect(() => {
    if (!addressSelect) {
      return
    }

    supabase
      .from('products')
      .select('id, id_influencer, id_kitchen, category, preview, name, description, price, state, influencers( full_name, avatar, path ), kitchens( open, address )')
      .eq('id', query)
      .then((res: any) => {
        if (res.data) {
          setProduct(res.data[0])
          fetch('/api/maps_distance', {
            cache: 'no-cache',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              origin: res.data[0].kitchens.address.geometry.location,
              destination: addressSelect.geometry.location
            })
          })
            .then(res => res.json())
            .then(data => {
              const { distance: { text: distance }, duration: { text: duration } } = data.rows[0].elements[0]

              const convertion = parseFloat(distance) * pricePerKm
              const operation = convertion > minima ? convertion : minima
              setShippingCost(operation)

              setEstimationTime(parseFloat(duration) + preparationTime)
            })
          return
        }
        setError({ message: 'Product does not exist' })
      })
  }, [addressSelect])

  useEffect(() => {
    if (product) {
      setTotal((product.price + serviceFee + shippingCost + tip + influencer))
    }
  }, [product, tip, shippingCost])

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
        {!product?.kitchens.open && <Alert message='Este restaurante esta cerrado!!' />}
        {!product?.kitchens.address && <Alert message='Este restaurante aun no esta listo para entregar domicilios' />}

        <AddressSelect setError={setError} />
        <ProductDetails product={product} />
        <EstimationTime time={estimationTime} />
        <Tip
          setTip={setTip}
          amount={product.price}
          serviceFee={serviceFee}
          influencer={influencer}
        />
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
          influencer={influencer}
          calculateMercadoPagoComission={calculateMercadoPagoComission}
        />
        <PaymentForm
          error={error}
          amount={total}
          product={product}
          description={'Foodllowers: ' + product.name + ' - ' + product.influencers.full_name}
          kitchenOpen={product?.kitchens.open}
          kitchenAddress={product?.kitchens.address}
          shippingCost={shippingCost}
          tip={tip}
          influencer={influencer}
          calculateMercadoPagoComission={calculateMercadoPagoComission}
        />
      </div>
    </main>
  )
}
