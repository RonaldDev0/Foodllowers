/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useSearchParams } from 'next/navigation'
import { useSupabase } from '../Providers'
import { useUser, useContent } from '@/store'
import { useState, useEffect } from 'react'
import { AddressSelect } from './AddressSelect'
import { ProductDetails } from './ProductDetails'
import { Tip } from './Tip'
import { Summary } from './Summary'
import { Alert } from '@/components/Alert'
import { EstimationTime } from './EstimationTime'
import { useDecrypt, useComission } from '@/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { MisteryBurguerOptions } from './MisteryBurguerOptions'
import { DiscountCoupon } from './DiscountCoupon'
import { Payment } from './payment'
import { DeliveryOption } from './DeliveryOption'

interface IPaymentInfo {
  card_number: string
  card_type: any
  expiration_date: string
  cvv: string
  card_holder: string
}

const MAX_SUPABASE_REALTIME = 100
const MAX_KITCHEN_LIMIT = 10

const MAX_DISTANCE = 15

// Note: This is a temporary limit to prevent abuse
const MAX_NUMBER_OF_PURCHASES = 100

export default function Checkout () {
  const query = useSearchParams().get('q')
  const isMisteryBurguer = query === '471ba020-79b7-4204-9e9d-2e8ca2b0f216'
  const { supabase } = useSupabase()
  const { addressSelect, addressList, userId, setStore } = useUser()
  const { currentProduct, pricePerKm, minima, serviceFee, influencer, preparationTime, setStore: setContentStore } = useContent()

  const [numberOfPurchases, setNumberOfPurchases] = useState(0)
  const [isMaximumOrders, setIsMaximumOrders] = useState(false)
  const [estimationTime, setEstimationTime] = useState(0)
  const [product, setProduct] = useState<any>(null)
  const [preferences, setPreferences] = useState<any>(null)
  const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo>({
    card_number: '',
    card_type: false,
    expiration_date: '',
    cvv: '',
    card_holder: ''
  })
  const [paymentError, setPaymentError] = useState<any>({
    card_number: false,
    card_type: false,
    expiration_date: false,
    cvv: false,
    card_holder: false
  })
  const [shippingCost, setShippingCost] = useState(0)
  const [shipingCostBackup, setShipingCostBackup] = useState(0)
  const [tip, setTip] = useState(0)
  const [total, setTotal] = useState<any>(null)
  const [haveDelivery, setHaveDelivery] = useState(false)
  const [numberOfProducts, setNumberOfProducts] = useState(1)

  const [haveCoupon, setHaveCoupon] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [error, setError] = useState<any>(false)
  const [isMaxDistance, setIsMaxDistance] = useState(false)
  const [pickUpInStore, setPickUpInStore] = useState<boolean>(false)

  function fetchMapsDistance (origin: any) {
    if (!addressSelect) return

    fetch('/api/maps/distance', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination: addressSelect.geometry.location })
    })
      .then(res => res.json())
      .then(data => {
        const { distance: { text: distance }, duration: { text: duration } } = data.rows[0].elements[0]

        const km = parseFloat(distance)

        const convertion = km * pricePerKm
        const operation = convertion > minima ? convertion : minima
        setShippingCost(operation)
        setShipingCostBackup(operation)

        setEstimationTime(parseFloat(duration) + preparationTime)
        setIsMaxDistance(km >= MAX_DISTANCE)
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
    if (serviceFee === 0 || influencer === 0) return

    if (currentProduct && currentProduct.id === query && addressSelect) {
      setProduct(currentProduct)
      fetchMapsDistance(currentProduct.kitchens.address.geometry.location)
      return
    }

    fetch('/api/content/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, influencer, serviceFee })
    })
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setContentStore('currentProduct', data)
        if (addressSelect) {
          fetchMapsDistance(data.kitchens.address.geometry.location)
        }
      })
  }, [addressSelect, serviceFee, influencer])

  useEffect(() => {
    if (product) {
      setTotal((product.price * numberOfProducts) + shippingCost + tip)
    }
  }, [product, tip, shippingCost, numberOfProducts])

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
        .neq('order_state', 'buscando delivery...')
        .neq('order_state', 'recogiendo...')
        .neq('order_state', 'entregando...')
        .neq('order_state', 'entregado')
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

  useEffect(() => {
    if (!currentProduct) return
    if (!pickUpInStore) return setShippingCost(shipingCostBackup)

    setShippingCost(0)
    setTip(0)
  }, [pickUpInStore, currentProduct])

  if (!product || !total) return null

  const AlertMessage = (() => {
    if ((!haveDelivery || isMaxDistance) && !pickUpInStore) {
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

  const discountPercent = haveCoupon ? 0.472 : 1
  const firstProductPriceWithDiscount = product.price * discountPercent
  const totalWithoutDiscount = product.price * (numberOfProducts - 1)
  const totalProductPrice = firstProductPriceWithDiscount + totalWithoutDiscount

  const priceIncrease = preferences ? (preferences.filter(({ isCombo }: any) => isCombo).length * 6000) : 0

  const mercadopago = useComission(totalProductPrice + priceIncrease)
  const productPriceWithCoupon = totalProductPrice + mercadopago + priceIncrease

  return (
    <main
      className='flex justify-center items-start gap-3 mt-20 mb-10
        [@media(max-width:800px)]:flex-col
        [@media(max-width:800px)]:items-center
        [@media(max-width:800px)]:w-96
        [@media(max-width:800px)]:mb-20
        [@media(max-width:365px)]:!w-80'
    >
      <Link
        href='/'
        className='
          [@media(min-width:800px)]:fixed
          [@media(min-width:800px)]:top-16'
      >
        <Image
          src='/img/LogName.svg'
          alt='Foodllowers'
          width='500'
          height='120'
          className='bg-zinc-950 rounded-lg'
        />
      </Link>
      <div
        className='flex flex-col gap-3 w-96
          [@media(max-width:365px)]:!w-80
          [@media(min-width:800px)]:w-[522px]
          [@media(min-width:800px)]:pt-32
          [@media(max-width:800px)]:pt-6'
      >
        <Alert message={AlertMessage} />
        <DeliveryOption pickUpInStore={pickUpInStore} setPickUpInStore={setPickUpInStore} />
        <AddressSelect
          setError={setError}
          pickUpInStore={pickUpInStore}
          kitchenAddress={product?.kitchens.address.formatted_address}
        />
        <ProductDetails
          product={product}
          numberOfProducts={numberOfProducts}
          setNumberOfProducts={setNumberOfProducts}
        />
        <MisteryBurguerOptions
          setValue={setPreferences}
          numberOfProducts={numberOfProducts}
          setNumberOfProducts={setNumberOfProducts}
          isMisteryBurguer={isMisteryBurguer}
        />
        {!isMisteryBurguer &&
        (
          <Tip
            setTip={setTip}
            amount={product.price + 1092}
            pickUpInStore={pickUpInStore}
          />
        )}
      </div>
      <div
        className={`flex flex-col gap-3 top-5
          [@media(min-width:800px)]:sticky
          [@media(min-width:800px)]:pt-32
          ${!isMisteryBurguer && 'w-96 [@media(max-width:365px)]:!w-80'}`}
      >
        <EstimationTime time={pickUpInStore ? preparationTime : estimationTime} />
        {isMisteryBurguer && (
          <Tip
            setTip={setTip}
            amount={product.price + 1092}
            pickUpInStore={pickUpInStore}
          />
        )}
        <Summary
          shippingCost={shippingCost + (shippingCost * 0.035)}
          tip={tip + (tip * 0.03)}
          productPriceWithCoupon={productPriceWithCoupon}
        />
        <DiscountCoupon
          haveCoupon={haveCoupon}
          setHaveCoupon={setHaveCoupon}
          coupon={coupon}
          setCoupon={setCoupon}
        />
        <Payment
          paymentError={paymentError}
          setPaymentError={setPaymentError}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          haveDelivery={haveDelivery}
          error={error}
          amount={Math.round(productPriceWithCoupon + (tip + tip * 0.0329) + (shippingCost + shippingCost * 0.0329))}
          product={product}
          shippingCost={shippingCost}
          tip={tip}
          influencer={influencer}
          isMaximumOrders={isMaximumOrders}
          isMaximumNumberOfPurchases={numberOfPurchases >= MAX_NUMBER_OF_PURCHASES}
          preferences={preferences}
          numberOfProducts={numberOfProducts}
          serviceFee={serviceFee}
          haveCoupon={haveCoupon}
          coupon={coupon}
          isMaxDistance={isMaxDistance}
          mercadopagoComision={mercadopago}
          pickUpInStore={pickUpInStore}
        />
      </div>
    </main>
  )
}
