import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'

// function calculateOrderAmount (items: any[]) {
//   return items.reduce((acc: any, product: any) => acc + product.price * 100, 0)
// }

async function conversion (price: any) {
  const { rates: { COP } } = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATE_ID}`, { next: { revalidate: 60 * 60 } }).then(res => res.json())
  return Math.floor((price / COP) * 100)
}

export async function POST (req: NextRequest) {
  const res = await req.json()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

  const paimentIntent = await stripe.paymentIntents.create({
    amount: await conversion(res.product.price),
    currency: 'USD',
    automatic_payment_methods: { enabled: true }
  })

  return NextResponse.json(paimentIntent.client_secret)
}
