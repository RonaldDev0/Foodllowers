'use client'
import { CardElement } from '@stripe/react-stripe-js'
import { Card, CardBody } from '@nextui-org/react'

export function CardForm ({ setCardComplete, error }: any) {
  const options: any = {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
        color: 'white'
      }
    }
  }

  return (
    <div className='text-center flex flex-col gap-4 [@media(min-width:800px)]:w-96 [@media(max-width:800px)]:w-92 my-10'>
      <Card shadow='lg'>
        <CardBody>
          <CardElement options={options} onChange={e => setCardComplete(e.complete)} />
        </CardBody>
      </Card>
      <p>{error}</p>
    </div>
  )
}
