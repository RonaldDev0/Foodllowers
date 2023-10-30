'use client'
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'

type props = {
  productPrice: number
  serviceFee: number
  shippingCost: number
  tip: number
  total: number
}

export function Summary ({ productPrice, serviceFee, shippingCost, tip, total }: props) {
  return (
    <Card className='w-96'>
      <CardHeader>
        Resumen
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-2'>
          <div className='text-left'>
            <p>Costo de producto</p>
            <p>Tarifa de servicio</p>
            <p>Costo de envío</p>
            <p>Propina del Delivery</p>
            <p className='font-bold mt-4'>Total</p>
          </div>
          <div className='text-right font-bold text-green-600'>
            <p>${productPrice.toLocaleString()}</p>
            <p>${serviceFee.toLocaleString()}</p>
            <p>${shippingCost.toLocaleString()}</p>
            <p>${tip.toLocaleString()}</p>
            <p className='mt-4'>${total.toLocaleString()}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
