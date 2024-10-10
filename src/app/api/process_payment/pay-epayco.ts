/* eslint-disable camelcase */

export async function Pay (card: any, paymentInfo: any, user: any, product: any) {
  fetch('https://api.secure.payco.co/v1/tokens', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer e1387e91eba8da6bf110c78ae8b3eea9'
    },
    body: JSON.stringify({
      card_number: card.card_number.replace(/\s+/g, ''),
      exp_month: card.expiration_date.slice(0, 2),
      exp_year: '20' + card.expiration_date.slice(5, 7),
      cvv: card.cvv,
      name: user.name
    })
  })
    .then(res => res.json())
    .then(console.log)
    .catch(error => console.log(error))
}
