'use client'
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'

type props = {
  productPrice: number
  shippingCost: number
  tip: number
  total: number
  numberOfProducts: number
  calculateMercadoPagoComission: Function
}

export function Summary ({ productPrice, shippingCost, tip, total, numberOfProducts, calculateMercadoPagoComission }: props) {
  function copFormat (value: number) {
    return value.toLocaleString('es-Es', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    })
  }

  return (
    <Card className='w-96 [@media(max-width:365px)]:!w-80'>
      <CardHeader>
        Resumen
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-2'>
          <div className='text-left'>
            <p>Costo de producto</p>
            <p>Costo de envío</p>
            <p>Propina del Delivery</p>
            <p className='font-bold mt-4'>Total</p>
          </div>
          <div className='text-right font-bold text-green-600'>
            <p>{copFormat((productPrice * numberOfProducts) + calculateMercadoPagoComission((productPrice * numberOfProducts) + tip + shippingCost))}</p>
            <p>{copFormat(shippingCost)}</p>
            <p>{copFormat(tip)}</p>
            <p className='mt-4'>
              {copFormat(total + calculateMercadoPagoComission((productPrice * numberOfProducts) + tip + shippingCost))}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
