/* eslint-disable camelcase */

export async function Pay (card: any, paymentInfo: any, user: any, product: any) {
  fetch(process.env.PAYU_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PAYU_API_KEY!}`
    },
    body: JSON.stringify({
      language: 'es',
      command: 'SUBMIT_TRANSACTION',
      test: true,
      merchant: {
        apiLogin: process.env.PAYU_API_LOGIN!,
        apiKey: process.env.PAYU_PUBLIC_KEY!
      }
    })
  })
    .then(res => res.text())
    .then(console.log)
}
