/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useSearchParams } from 'next/navigation'
import { useSupabase } from '../Providers'
import { useUser, useContent } from '@/store'
import { useState, useEffect } from 'react'
import { AddressSelect } from './AddressSelect'
import { ProductDetails } from './ProductDetails'
import { PaymentForm } from './PaymentForm'
import { Tip } from './Tip'
import { Summary } from './Summary'
import { Alert } from '@/components/Alert'
import { EstimationTime } from './EstimationTime'
import { PaymentButton } from './PaymentButton'
import { useDecrypt } from '@/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { MisteryBurguerOptions } from './MisteryBurguerOptions'

interface IPaymentInfo {
  card_number: string
  card_type: any
  expiration_date: string
  cvv: string
}

const MAX_SUPABASE_REALTIME = 100
const MAX_KITCHEN_LIMIT = 5

// Note: This is a temporary limit to prevent abuse
const MAX_NUMBER_OF_PURCHASES = 100

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
  const { addressSelect, addressList, userId, setStore } = useUser()
  const { currentProduct, pricePerKm, minima, serviceFee, influencer, preparationTime } = useContent()

  const [numberOfPurchases, setNumberOfPurchases] = useState(0)
  const [isMaximumOrders, setIsMaximumOrders] = useState(false)
  const [estimationTime, setEstimationTime] = useState(0)
  const [product, setProduct] = useState<any>(null)
  const [preferences, setPreferences] = useState<any>(null)
  const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo>({
    card_number: '',
    card_type: false,
    expiration_date: '',
    cvv: ''
  })
  const [paymentError, setPaymentError] = useState<any>({
    card_number: false,
    card_type: false,
    expiration_date: false,
    cvv: false
  })
  const [shippingCost, setShippingCost] = useState(0)
  const [tip, setTip] = useState(0)
  const [total, setTotal] = useState<any>(null)
  const [haveDelivery, setHaveDelivery] = useState(false)

  const [error, setError] = useState<any>(false)

  function fetchMapsDistance (origin: any) {
    if (!addressSelect) return
    fetch('/api/maps_distance', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination: addressSelect.geometry.location })
    })
      .then(res => res.json())
      .then(data => {
        const { distance: { text: distance }, duration: { text: duration } } = data.rows[0].elements[0]

        const convertion = parseFloat(distance) * pricePerKm
        const operation = convertion > minima ? convertion : minima
        setShippingCost(operation)

        setEstimationTime(parseFloat(duration) + preparationTime)
      })
  }

  useEffect(() => {
    if (!userId || addressList) return

    supabase
      .from('addresses')
      .select('id, user, number, numberPrefix, aditionalInfo, formatted_address, geometry')
      .then(({ data, error }) => {
        if (error) return

        useDecrypt({
          key: userId,
          data,
          ignore: ['id']
        }).then(res => {
          setStore('addressList', res)
          setStore('addressSelect', res[0])
        })
      })
  }, [userId])

  useEffect(() => {
    if (currentProduct && addressSelect) {
      setProduct(currentProduct)
      fetchMapsDistance(currentProduct.kitchens.address.geometry.location)
      return
    }

    supabase
      .from('products')
      .select('id, id_influencer, id_kitchen, category, preview, name, description, price, state, influencers( id, full_name, avatar ), kitchens( open, address )')
      .eq('id', query)
      .then((res: any) => {
        if (res.data) {
          const product = res.data[0].id_influencer !== null ? res.data[0] : null
          setProduct(product)
          if (addressSelect) {
            fetchMapsDistance(res.data[0].kitchens.address.geometry.location)
          }
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

  useEffect(() => {
    if (!product) return

    async function updateData () {
      const { isMaximumOrders, ordersCount }: any = await supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .then(({ count, error }) => {
          if (error || !count) return { isMaximumOrders: false, ordersCount: count }

          const isMaximumOrders = count >= MAX_SUPABASE_REALTIME
          setIsMaximumOrders(isMaximumOrders)

          return { isMaximumOrders, ordersCount: count }
        })

      if (isMaximumOrders) return

      const shipmentsCount = await supabase
        .from('shipments')
        .select('id', { count: 'exact', head: true })
        .then(({ count }) => {
          return count
        })

      setNumberOfPurchases(ordersCount + shipmentsCount)

      supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('kitchen_id', product.id_kitchen)
        .then(({ count, error }) => {
          if (error || !count) return
          setIsMaximumOrders(count >= MAX_KITCHEN_LIMIT)
        })
    }
    updateData()

    supabase
      .from('deliverys')
      .select('id', { head: true, count: 'exact' })
      .eq('register_complete', true)
      .eq('register_step', 'finished')
      .eq('active', true)
      .eq('free', true)
      .then(({ error, count }) => {
        if (error) return
        setHaveDelivery(!!count)
      })
  }, [product])

  if (!product || !total) return null

  const AlertMessage = (() => {
    if (!haveDelivery) {
      return 'Actualmente no tenemos deliverys en tu zona'
    } else if (!product?.kitchens.open) {
      return 'Este restaurante esta cerrado!!'
    } else if (!product?.kitchens.address) {
      return 'Este restaurante aun no esta listo para entregar domicilios'
    } else if (isMaximumOrders) {
      return 'La cocina está procesando el máximo de pedidos posibles. Regresa más tarde.'
    } else {
      return `Quedan ${MAX_NUMBER_OF_PURCHASES - numberOfPurchases} productos disponibles`
    }
  })()

  return (
    <main
      className='flex justify-center items-start gap-5 mt-16 mb-14
        [@media(max-width:800px)]:flex-col
        [@media(max-width:800px)]:items-center
        [@media(max-width:800px)]:w-96
        [@media(max-width:800px)]:mb-20
        [@media(max-width:400px)]:!w-80'
    >
      <Link
        href='/'
        className='
          [@media(min-width:800px)]:fixed
          [@media(min-width:800px)]:top-16'
      >
        <Image
          src='/img/LogName-light.png'
          alt='Foodllowers'
          width='450'
          height='450'
          className='dark:hidden'
        />
        <Image
          src='/img/LogName.png'
          alt='Foodllowers'
          width='450'
          height='450'
          className='hidden dark:block'
        />
      </Link>
      <div
        className='flex flex-col gap-5
          [@media(min-width:800px)]:w-[522px]
          [@media(min-width:800px)]:pt-32
          [@media(max-width:800px)]:pt-6'
      >
        <Alert message={AlertMessage} />

        <AddressSelect setError={setError} />
        <ProductDetails product={product} />
        <EstimationTime time={estimationTime} />
        <Tip
          setTip={setTip}
          amount={product.price}
          serviceFee={serviceFee}
          influencer={influencer}
          calculateMercadoPagoComission={calculateMercadoPagoComission}
          total={total}
        />
      </div>
      <div
        className='flex flex-col gap-5 top-5
          [@media(min-width:800px)]:sticky
          [@media(min-width:800px)]:pt-32'
      >
        <MisteryBurguerOptions setValue={setPreferences} />
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
          paymentError={paymentError}
          setPaymentError={setPaymentError}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
        />
        <PaymentButton
          haveDelivery={haveDelivery}
          setPaymentError={setPaymentError}
          paymentInfo={paymentInfo}
          error={error}
          amount={total + calculateMercadoPagoComission(total)}
          product={product}
          shippingCost={shippingCost}
          tip={tip}
          influencer={influencer}
          isMaximumOrders={isMaximumOrders}
          isMaximumNumberOfPurchases={numberOfPurchases >= MAX_NUMBER_OF_PURCHASES}
          preferences={preferences}
        />
      </div>
    </main>
  )
}
