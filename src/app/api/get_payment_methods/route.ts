/* eslint-disable camelcase */
import { NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  try {
    const res = await fetch('https://api.mercadopago.com/v1/payment_methods', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(res => res.filter((res: any) => res.id === 'pse')[0].financial_institutions)

    return NextResponse.json(res)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'transacción rechazada', line: 82 })
  }
}
