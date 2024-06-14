'use client'
import { Card, CardHeader, CardBody, Divider, Input } from '@nextui-org/react'

interface props {
  paymentInfo: any
  setPaymentInfo: Function
  paymentError: any
  setPaymentError: Function
}

export function PaymentForm ({ paymentInfo, setPaymentInfo, paymentError, setPaymentError }: props) {
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setPaymentError({ ...paymentError, [name]: false })

    switch (name) {
      case 'card_number':
        if (value.length <= 16) {
          setPaymentInfo({ ...paymentInfo, [name]: value })
        }
        break
      case 'expiration_date':
        if (value.length <= 4) {
          setPaymentInfo({ ...paymentInfo, [name]: value })
        }
        break
      case 'cvv':
        if (value.length <= 4) {
          setPaymentInfo({ ...paymentInfo, [name]: value })
        }
        break
      default:
        break
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          Información de pago
        </CardHeader>
        <Divider />
        <CardBody className='w-96 flex flex-col gap-4'>
          <span>Número de la tarjeta</span>
          <Input
            name='card_number'
            value={paymentInfo.card_number}
            onChange={handleChange}
            type='number'
            placeholder='1234 1234 1234 1234'
            isInvalid={!!paymentError.card_number}
            errorMessage={paymentError.card_number}
          />
          <div className='flex gap-4'>
            <div>
              <span>Fecha de expiración</span>
              <Input
                name='expiration_date'
                value={paymentInfo.expiration_date}
                onChange={handleChange}
                type='number'
                placeholder='MM/YY'
                isInvalid={!!paymentError.expiration_date}
                errorMessage={paymentError.expiration_date}
              />
            </div>
            <div>
              <span>CVV</span>
              <Input
                name='cvv'
                value={paymentInfo.cvv}
                onChange={handleChange}
                type='number'
                placeholder='123'
                isInvalid={!!paymentError.cvv}
                errorMessage={paymentError.cvv}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
