/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
    idempotencyKey: crypto.randomUUID()
  }
})

const payment = new Payment(client)

export async function POST (req: NextRequest) {
  const { product, shippingCost, tip, influencer, userId, user, addressSelect, paymentInfo, card } = await req.json()

  const token = await fetch('https://api.mercadopago.com/v1/card_tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${client.accessToken}`
    },
    body: JSON.stringify({
      card_number: card.card_number.replace(/\s+/g, ''),
      expiration_month: card.expiration_date.slice(0, 2),
      expiration_year: '20' + card.expiration_date.slice(5, 7),
      security_code: card.cvv,
      cardholder: {
        name: user.name
      }
    })
  })
    .then(res => res.json())
    .then(res => res.id)

  const { id, status, transaction_amount, fee_details }: any = await payment.create({ body: { ...paymentInfo, token } })

  if (status !== 'approved') return NextResponse.json({ error: true })

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
      transaction_amount: {
        mercadopago: Math.floor(fee_details[0].amount),
        influencer,
        kitchen: product.price,
        delivery: {
          service: shippingCost,
          tip
        },
        earnings: transaction_amount - Math.floor(fee_details[0].amount) - product.price - shippingCost - tip - influencer,
        total: transaction_amount
      }
    }])
    .select('id')
    .then(({ error }) => {
      if (error) return { error: true }
      return { error: false }
    })

  return NextResponse.json(response)
}
