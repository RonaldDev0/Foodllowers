import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST (req: NextRequest) {
  const { paymentData, data } = await req.json()

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
    options: {
      timeout: 5000,
      idempotencyKey: crypto.randomUUID()
    }
  })

  const payment = new Payment(client)
  const response = await payment.create({ body: paymentData })

  if (response.status === 'approved') {
    const order = await supabase
      .from('orders')
      .insert([{
        user_id: data.userId,
        product: data.product,
        order_state: true,
        kitchen_id: data.product.id_kitchen,
        user_address: data.address
      }])
      .select('*')

    return NextResponse.json(order.data && order.data[0])
  }

  return NextResponse.json(response)
}
