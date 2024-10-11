/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Pay } from './pay-mercadopago'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const every = 30

function generateCoupons (shipments: number, coupons: number) {
  const aviableCoupons = Math.floor((shipments - coupons) / every)
  const generate = aviableCoupons > 1
    ? Math.floor((shipments - coupons - (aviableCoupons - coupons - 1)) / every) - coupons
    : aviableCoupons - coupons

  return generate >= 1 ? generate : 0
}

function generarCodigoCupon () {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let codigoCupon = ''

  for (let i = 0; i < 10; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
    codigoCupon += caracteres[indiceAleatorio]
  }

  return codigoCupon
}

export async function POST (req: NextRequest) {
  const {
    product,
    shippingCost,
    tip,
    influencer,
    userId,
    user,
    addressSelect,
    paymentInfo,
    card,
    preferences,
    numberOfProducts,
    serviceFee,
    haveCoupon,
    coupon
  } = await req.json()

  // Pay(card, paymentInfo, user, product)
  // return NextResponse.json({ error: 'transacción rechazada' })

  try {
    const { id, status, transaction_amount, fee_details } = await Pay(card, paymentInfo, user)

    if (status !== 'approved') return NextResponse.json({ error: 'Transacción rechazada' })

    const mercadopago = Math.floor(fee_details[0].amount)
    const discountPercent = haveCoupon ? 0.472 : 1
    const influencerEarnings = (influencer * discountPercent) + (influencer * (numberOfProducts - 1))

    const kitchenFirstProductEarnings = (product.price - influencer - serviceFee) * discountPercent
    const kitchenOtherProductsEarnings = (product.price - influencer - serviceFee) * (numberOfProducts - 1)
    const kitchen = Math.round(kitchenFirstProductEarnings + kitchenOtherProductsEarnings)

    const earnings = Math.round(transaction_amount - kitchen - influencerEarnings - mercadopago - shippingCost - tip)

    const response = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        user_name: user.name,
        product,
        order_state: 'buscando cocina...',
        kitchen_id: product.id_kitchen,
        influencer_id: product.influencers.id,
        user_address: addressSelect,
        kitchen_address: product.kitchens.address,
        invoice_id: id,
        user_email: user.email,
        payment_status: 'approved',
        preferences,
        transaction_amount: {
          mercadopago,
          influencer: influencerEarnings,
          kitchen,
          delivery: { service: shippingCost, tip },
          earnings,
          total: transaction_amount
        }
      }])
      .select('id')
      .then(({ error }) => {
        if (error) return { error: 'transacción rechazada' }
        return { error: false }
      })

    // disalbe coupon system
    if (haveCoupon) {
      supabase
        .from('coupons')
        .update({ active: false })
        .eq('code', coupon)
        .then(({ error }) => {
          if (error) console.log(error)
        })
    }

    // generate coupon system
    const shipments = await supabase
      .from('shipments')
      .select('id', { count: 'exact', head: true })
      .then(({ count, error }) => {
        if (error || count === null) return 0
        return count
      })

    const orders = await supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .then(({ count, error }) => {
        if (error || count === null) return 0
        return count
      })

    const coupons = await supabase
      .from('coupons')
      .select('id', { count: 'exact', head: true })
      .then(({ count, error }) => {
        if (error || count === null) return 0
        return count
      })

    const data = Array
      .from({ length: generateCoupons(shipments + orders, coupons) },
        () => ({ code: generarCodigoCupon() }))

    supabase
      .from('coupons')
      .insert(data)
      .then(({ error }) => {
        if (error) console.log(error)
      })

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'transacción rechazada' })
  }
}
