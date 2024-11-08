import { supabase } from '@/lib/supabase'

const every = 30

function generateCoupons (shipments: number, coupons: number) {
  const aviableCoupons = Math.floor((shipments - coupons) / every)
  const generate = aviableCoupons > 1
    ? Math.floor((shipments - coupons - (aviableCoupons - coupons - 1)) / every) - coupons
    : aviableCoupons - coupons

  return generate >= 1 ? generate : 0
}

function generarCodigoCupon () {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let codigoCupon = ''

  for (let i = 0; i < 10; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
    codigoCupon += caracteres[indiceAleatorio]
  }

  return codigoCupon
}

export async function coupons (haveCoupon: boolean, coupon: string) {
  // disalbe coupon system
  if (haveCoupon) {
    supabase
      .from('coupons')
      .update({ active: false })
      .eq('code', coupon)
      .then(({ error }) => {
        if (error) console.log(error)
      })
  }

  // generate coupon system
  const shipments = await supabase
    .from('shipments')
    .select('id', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error || count === null) return 0
      return count
    })

  const orders = await supabase
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error || count === null) return 0
      return count
    })

  const coupons = await supabase
    .from('coupons')
    .select('id', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error || count === null) return 0
      return count
    })

  const data = Array
    .from({ length: generateCoupons(shipments + orders, coupons) },
      () => ({ code: generarCodigoCupon() }))

  supabase
    .from('coupons')
    .insert(data)
    .then(({ error }) => {
      if (error) console.log(error)
    })
}
