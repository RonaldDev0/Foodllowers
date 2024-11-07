/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { paymentId } = await req.json()

  try {
    const { id, status, fee_details }: any = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${process.env.MP_ACCESS_TOKEN}`)
      .then(res => res.json())

    const mercadopago = Math.floor(fee_details[0].amount)

    return NextResponse.json({ id, status, mercadopago, error: false })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'No se encontró la transacción' })
  }
}
