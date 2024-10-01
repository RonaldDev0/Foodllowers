/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000, idempotencyKey: crypto.randomUUID() }
})

const payment = new Payment(client)

export async function POST (req: NextRequest) {
  try {
    const { product, shippingCost, tip, influencer, userId, user, addressSelect, paymentInfo, card, preferences, numberOfProducts, serviceFee } = await req.json()

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
        cardholder: { name: user.name }
      })
    })
      .then(res => res.json())
      .then(res => res.id)
      .catch(err => console.log(err))

    const { id, status, transaction_amount, fee_details }: any = await payment.create({
      body: { ...paymentInfo, token, installments: 1 }
    })

    console.log({ id, status, transaction_amount, fee_details })

    if (status !== 'approved') return NextResponse.json({ error: true })

    const mercadopago = Math.floor(fee_details[0].amount)
    const influencerEarnings = influencer * numberOfProducts

    const kitchen = ((product.price - influencer - serviceFee) * numberOfProducts)
    const earnings = transaction_amount - kitchen - influencerEarnings - mercadopago - shippingCost - tip

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
        if (error) return { error: true }
        return { error: false }
      })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: true })
  }
}
