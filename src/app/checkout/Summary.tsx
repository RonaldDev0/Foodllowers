'use client'
import { Card, CardHeader, CardBody, Divider, Tooltip } from '@nextui-org/react'

type props = {
  shippingCost: number
  tip: number
  productPriceWithCoupon: number
}

export function Summary ({ shippingCost, tip, productPriceWithCoupon }: props) {
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
    <Card className='w-full [@media(max-width:365px)]:!w-80 border border-white border-opacity-10'>
      <CardHeader>
        Resumen
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-2'>
          <div className='text-left'>
            <p>Costo de producto</p>
            <Tooltip showArrow content='El costo de envío es proporcional a la distancia de recorrido'>
              <p>Costo de envío</p>
            </Tooltip>
            <p>Propina del Delivery</p>
            <p className='font-bold mt-4'>Total</p>
          </div>
          <div className='text-right font-bold text-green-600'>
            <p>{copFormat(productPriceWithCoupon)}</p>
            <Tooltip showArrow content='El costo de envío es proporcional a la distancia de recorrido'>
              <p>{copFormat(shippingCost)}</p>
            </Tooltip>
            <p>{copFormat(tip)}</p>
            <p className='mt-4'>
              {copFormat(productPriceWithCoupon + tip + shippingCost)}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
