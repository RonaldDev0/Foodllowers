'use client'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { Card, CardBody, Button } from '@nextui-org/react'
import { useSupabase } from '../Providers'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)

type props = {
  amount: number
  description: string
  error: Boolean
  product: any
  kitchenOpen: boolean
}

export function PaymentForm ({ amount, description, error, product, kitchenOpen }: props) {
  const { supabase } = useSupabase()
  const { darkMode, addressSelect, userId } = useUser()
  const router = useRouter()

  const onSubmit = async ({ formData }: any) => {
    const order = await supabase
      .from('orders')
      .select('*')
      .then(({ data }: any) => data)

    const { ip }: any = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())

    if (error) {
      alert(JSON.stringify(error, null, 2))
      router.refresh()
      return
    }

    if (order.length) {
      alert('ya tienes un pedido en camino!, no puedes hacer mas de un pedido al mismo tiempo')
      router.push('/currentshipment')
      return
    }

    if (!kitchenOpen) {
      alert('Esta cocina esta cerrada!!')
      router.refresh()
      return
    }

    fetch('/api/process_payment', {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        callback_url: 'https://foodllowers.vercel.app/currentshipment',
        description,
        additional_info: { ip_address: ip }
      })
    })
      .then(res => res.json())
      .then(({ status }) => {
        if (status === 'approved') {
          supabase
            .from('orders')
            .insert([{
              user_id: userId,
              product,
              order_state: 'buscando cocina...',
              kitchen_id: product.id_kitchen,
              user_address: addressSelect
            }])
            .select('*')
            .then(({ data }) => data && router.push('/currentshipment'))
        }
      })
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
      <Button onClick={() => {
        supabase
          .from('orders')
          .insert([{
            user_id: userId,
            product,
            order_state: 'buscando cocina...',
            kitchen_id: product.id_kitchen,
            user_address: addressSelect
          }])
          .select('*')
          .then(({ data }) => data && router.push('/currentshipment'))
      }}
      >
        saltar pago
      </Button>
    </Card>
  )
}
