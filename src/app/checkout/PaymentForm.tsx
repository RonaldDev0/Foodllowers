import { Card, CardHeader, CardBody, Divider, Input } from '@nextui-org/react'

interface props {
  paymentInfo: any
  setPaymentInfo: Function
}

export function PaymentForm ({ paymentInfo, setPaymentInfo }: props) {

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setPaymentInfo({ ...paymentInfo, [name]: value })
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
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
