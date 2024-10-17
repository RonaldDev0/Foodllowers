/* eslint-disable camelcase */
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function Pay (paymentInfo: any) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
    options: { timeout: 5000, idempotencyKey: crypto.randomUUID() }
  })

  const payment = new Payment(client)
  const { id, status_detail, transaction_amount, fee_details, transaction_details: { external_resource_url } }: any = await payment
    .create({ body: { ...paymentInfo, installments: 1 } })

  return { id, fee_details, status_detail, transaction_amount, external_resource_url }
}
