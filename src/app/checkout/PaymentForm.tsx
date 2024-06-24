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
    const isTyping = value.length > paymentInfo[name].length

    setPaymentError({ ...paymentError, [name]: false })

    if (name === 'card_number' && value.length <= 16) {
      setPaymentInfo({ ...paymentInfo, [name]: value })
    }

    if (name === 'expiration_date' && value.length <= 5) {
      if (value.length === 3) {
        if (isTyping) {
          // Si el usuario está escribiendo, formatear el valor como 'MM/YY'
          setPaymentInfo({ ...paymentInfo, [name]: value.slice(0, 2) + '/' + value.slice(2) })
        } else {
          // Si el usuario está borrando, eliminar el último carácter
          setPaymentInfo({ ...paymentInfo, [name]: value.slice(0, -1) })
        }
      } else {
        // Si la longitud no es 3, actualizar el valor sin cambios
        setPaymentInfo({ ...paymentInfo, [name]: value })
      }
    }

    if (name === 'cvv' && value.length <= 4) {
      setPaymentInfo({ ...paymentInfo, [name]: value })
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
                type='text'
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
