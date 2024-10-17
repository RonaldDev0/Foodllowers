/* eslint-disable camelcase */
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function Pay (card: any, paymentInfo: any) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
    options: { timeout: 5000, idempotencyKey: crypto.randomUUID() }
  })

  const payment = new Payment(client)

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
      cardholder: { name: card.card_holder }
    })
  })
    .then(res => res.json())
    .then(res => res.id)
    .catch(err => console.log(err))

  const { id, status, transaction_amount, fee_details }: any = await payment
    .create({
      body: { ...paymentInfo, token, installments: 1 }
    })

  return { id, status, transaction_amount, fee_details }
}
