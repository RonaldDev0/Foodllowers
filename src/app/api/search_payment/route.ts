import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { paymentId } = await req.json()

  const { id, status }: any = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${process.env.MP_ACCESS_TOKEN}`)

  return NextResponse.json({ id, status })
}
