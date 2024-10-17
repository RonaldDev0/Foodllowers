/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from './supabase'
import { Pay } from './pay'
import { amounts } from './amounts'
import { coupons } from './coupons'

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
    preferences,
    numberOfProducts,
    serviceFee,
    haveCoupon,
    coupon,
    mercadopagoComision,
    influencer_id
  } = await req.json()

  try {
    const { id, status_detail, transaction_amount, external_resource_url } = await Pay(paymentInfo)

    if (status_detail !== 'pending_waiting_transfer') {
      return NextResponse.json({ error: 'Transacción rechazada', line: 31 })
    }

    const { influencerEarnings, kitchen, earnings, mercadopago } = amounts(
      haveCoupon,
      influencer,
      numberOfProducts,
      preferences,
      product,
      serviceFee,
      shippingCost,
      tip,
      transaction_amount,
      mercadopagoComision
    )

    const response = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        user_name: user.name,
        product,
        order_state: 'buscando cocina...',
        kitchen_id: product.id_kitchen,
        influencer_id,
        user_address: addressSelect,
        kitchen_address: product.kitchens.address,
        invoice_id: id,
        user_email: user.email,
        payment_status: 'pending...',
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
        if (error) return { error: 'transacción rechazada', line: 73 }
        return { error: false, external_resource_url }
      })

    coupons(haveCoupon, coupon)

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'transacción rechazada', line: 82 })
  }
}
