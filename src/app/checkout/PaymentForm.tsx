'use client'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { Card, CardBody } from '@nextui-org/react'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)

type props = {
  amount: number
  description: string
  error: Boolean
  product: any
}

export function PaymentForm ({ amount, description, error, product }: props) {
  const { darkMode, addressSelect, userId } = useUser()
  const router = useRouter()

  const onSubmit = async ({ formData }: any) => {
    const { ip }: any = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())

    if (error) {
      alert(JSON.stringify(error, null, 2))
      router.refresh()
      return
    }

    fetch('/api/process_payment', {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentData: {
          ...formData,
          callback_url: 'https://foodllowers.vercel.app/currentshipment',
          description,
          additional_info: { ip_address: ip }
        },
        data: {
          address: addressSelect,
          product,
          userId
        }
      })
    })
      .then(res => res.json())
      .then(data => router.push(`/currentshipment?q=${data.id}`))
      .catch(console.error)
  }

  return (
    <Card>
      <CardBody className='p-0 w-96'>
        <Payment
          key={amount}
          onSubmit={onSubmit}
          locale='es-CO'
          initialization={{ amount }}
          customization={{
            visual: {
              style: {
                theme: darkMode ? 'dark' : 'flat'
              }
            },
            paymentMethods: {
              // mercadoPago: 'all',
              // ticket: 'all',
              // bankTransfer: 'all',
              creditCard: 'all',
              debitCard: 'all'
            }
          }}
        />
      </CardBody>
    </Card>
  )
}
