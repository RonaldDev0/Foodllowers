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
    card,
    preferences,
    numberOfProducts,
    serviceFee,
    haveCoupon,
    coupon
  } = await req.json()

  try {
    const { id, status, transaction_amount, fee_details } = await Pay(card, paymentInfo)

    if (status !== 'approved') {
      return NextResponse.json({ error: 'Transacción rechazada' })
    }

    const { influencerEarnings, kitchen, earnings, mercadopago } = amounts(
      fee_details,
      haveCoupon,
      influencer,
      numberOfProducts,
      preferences,
      product,
      serviceFee,
      shippingCost,
      tip,
      transaction_amount
    )

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
        if (error) return { error: 'transacción rechazada', line: 73 }
        return { error: false }
      })

    coupons(haveCoupon, coupon)

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'transacción rechazada', line: 82 })
  }
}
