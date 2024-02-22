/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function POST (req: NextRequest) {
  const body = await req.json()

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
    options: {
      timeout: 5000,
      idempotencyKey: crypto.randomUUID()
    }
  })

  const payment = new Payment(client)
  const { id, status, transaction_amount } = await payment.create({ body })

  return NextResponse.json({ id, status, transaction_amount })
}
