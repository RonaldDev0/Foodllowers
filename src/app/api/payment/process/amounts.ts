/* eslint-disable camelcase */

export function amounts (
  fee_details: any,
  haveCoupon: boolean,
  influencer: number,
  numberOfProducts: number,
  preferences: any[],
  product: any,
  serviceFee: number,
  shippingCost: number,
  tip: number,
  transaction_amount: number
) {
  const mercadopago = Math.floor(fee_details[0].amount)
  const discountPercent = haveCoupon ? 0.472 : 1
  const influencerEarnings = (influencer * discountPercent) + (influencer * (numberOfProducts - 1))

  const priceIncrease = preferences?.filter(({ isCombo }: any) => isCombo).length * 6000

  const kitchenFirstProductEarnings = (product.price - influencer - serviceFee) * discountPercent
  const kitchenOtherProductsEarnings = (product.price - influencer - serviceFee) * (numberOfProducts - 1)
  const kitchen = Math.round(kitchenFirstProductEarnings + kitchenOtherProductsEarnings + priceIncrease)

  const earnings = Math.round(transaction_amount - kitchen - influencerEarnings - mercadopago - shippingCost - tip)

  return {
    influencerEarnings,
    kitchen,
    earnings,
    mercadopago
  }
}
