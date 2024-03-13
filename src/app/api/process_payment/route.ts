/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { writeFile } from 'fs'

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
  const data = await payment.create({ body })
  writeFile('/src/app/api/responses/mercadopagoResponse.json', JSON.stringify(data, null, 2), error => {
    console.log(error)
  })
  const { id, status, transaction_amount, fee_details, transaction_details: { external_resource_url } }: any = data

  return NextResponse.json({ id, status, transaction_amount, fee_details, external_resource_url })
}
