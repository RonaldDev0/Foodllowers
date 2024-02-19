/* eslint-disable camelcase */
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [alert, setAlert] = useState<string | null>(null)

  const onSubmit = async ({ formData }: any) => {
    const order = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .then(({ data }: any) => data)

    const { ip }: any = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())

    if (error) {
      setAlert(JSON.stringify(error, null, 2))
      router.refresh()
      return
    }

    if (!product.state) {
      setAlert('Este producto se encuentra agotado.')
      router.refresh()
      return
    }

    if (!kitchenOpen) {
      setAlert('Esta cocina esta cerrada!!')
      router.refresh()
      return
    }

    if (order.length) {
      setAlert('ya tienes un pedido en camino!, no puedes hacer mas de un pedido al mismo tiempo')
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
      .then(({ id, status }) => {
        if (status === 'approved') {
          supabase
            .from('orders')
            .insert([{
              user_id: userId,
              product,
              order_state: 'buscando cocina...',
              kitchen_id: product.id_kitchen,
              user_address: addressSelect,
              kitchen_logo: product.kitchens.logo,
              invoice_id: id
            }])
            .select('id')
            .then(({ data }) => data && router.push('/currentshipment'))
        }
      })
  }

  useEffect(() => {
    if (alert) {
      onOpen()
    }
  }, [alert])

  return (
    <>
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
                mercadoPago: 'all',
                // ticket: 'all',
                bankTransfer: 'all',
                creditCard: 'all',
                debitCard: 'all'
              }
            }}
          />
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <p>Error</p>
              </ModalHeader>
              <ModalBody>
                <p>{alert}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='secondary'
                  onPress={() => {
                    if (alert === 'ya tienes un pedido en camino!, no puedes hacer mas de un pedido al mismo tiempo') {
                      router.push('/currentshipment')
                    }
                    onClose()
                  }}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
