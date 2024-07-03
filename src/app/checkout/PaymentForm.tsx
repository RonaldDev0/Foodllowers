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

    if (name === 'card_number' && value.length <= 19) {
      // Eliminar todos los espacios y formatear
      const cleanedValue = value.replace(/\D/g, '')
      let formattedCardNumber = ''

      for (let i = 0; i < cleanedValue.length; i += 4) {
        if (i > 0) formattedCardNumber += ' '
        formattedCardNumber += cleanedValue.substring(i, i + 4)
      }

      if (formattedCardNumber.length <= 19) {
        setPaymentInfo({ ...paymentInfo, [name]: formattedCardNumber })
      }
    }

    if (name === 'expiration_date' && value.length <= 5) {
      // Eliminar todos los caracteres no numéricos excepto '/'
      const cleanedValue = value.replace(/[^\d/]/g, '')

      // Formatear la fecha de expiración
      let formattedExpirationDate = cleanedValue
      if (cleanedValue.length === 2 && isTyping) {
        formattedExpirationDate = cleanedValue + '/'
      } else if (cleanedValue.length === 3 && !isTyping) {
        formattedExpirationDate = cleanedValue.slice(0, 2)
      }

      setPaymentInfo({ ...paymentInfo, [name]: formattedExpirationDate })
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
            type='text'
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
