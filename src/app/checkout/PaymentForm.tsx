/* eslint-disable camelcase */
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useSupabase } from '@/app/Providers'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)

type props = {
  amount: number
  error: Boolean
  product: any
  shippingCost: number
  tip: number
  influencer: number
  calculateMercadoPagoComission: Function
  isMaximumOrders: boolean
  isMaximumNumberOfPurchases: boolean
}

export function PaymentForm ({
  amount,
  error,
  product,
  shippingCost,
  tip,
  influencer,
  calculateMercadoPagoComission,
  isMaximumOrders,
  isMaximumNumberOfPurchases
}: props) {
  const { supabase } = useSupabase()
  const { darkMode, addressSelect, userId, user } = useUser()
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [alert, setAlert] = useState<string | null>(null)

  const custormization: any = {
    visual: {
      style: {
        theme: darkMode ? 'dark' : 'flat',
        customVariables: {
          baseColor: '#8a4af3',
          buttonTextColor: '#F8F0EA',
          formBackgroundColor: darkMode ? '#18181B' : '',
          inputBackgroundColor: darkMode ? '#27272A' : ''
        }
      }
    },
    paymentMethods: {
      // mercadoPago: 'all',
      debitCard: 'all'
      // bankTransfer: 'all'
    }
  }

  const onSubmit = async ({ formData }: any) => {
    if (isMaximumOrders) {
      setAlert('La cocina está procesando el máximo de pedidos posibles. Regresa más tarde.')
      return
    } else if (isMaximumNumberOfPurchases) {
      setAlert('No quedan más productos disponibles')
      return
    }

    const order = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', userId)
      .then(({ data }: any) => data)

    const { ip }: any = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())

    if (error) {
      setAlert(JSON.stringify(error, null, 2))
      router.refresh()
      return
    } else if (!product.state) {
      setAlert('Este producto se encuentra agotado.')
      router.push('/')
      return
    } else if (!product?.kitchens.open) {
      setAlert('Esta cocina esta cerrada!!')
      router.push('/')
      return
    } else if (!product?.kitchens.address) {
      setAlert('Este restaurante aun no esta listo para entregar domicilios')
      router.push('/')
      return
    } else if (order.length) {
      setAlert('ya tienes un pedido en camino!, no puedes hacer mas de un pedido al mismo tiempo')
      return
    }

    fetch('/api/process_payment', {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product,
        shippingCost,
        tip,
        influencer,
        userId,
        user,
        addressSelect,
        paymentInfo: {
          ...formData,
        callback_url: 'https://foodllowers.vercel.app/currentshipment',
        description: `Foodllowers: ${product.name} - ${product.influencers.full_name}`,
        additional_info: { ip_address: ip }
        },
      })
    })
      .then(res => res.json())
      .then(({ error }) => {
        if (error) return router.refresh()
        router.push('/currentshipment')
      })
  }

  useEffect(() => {
    if (alert) onOpen()
  }, [alert])

  return (
    <>
      <Card>
        <CardBody className='p-0 w-96'>
          <Payment
            key={product.id}
            onSubmit={onSubmit}
            locale='es-CO'
            initialization={{ amount: amount + calculateMercadoPagoComission(amount) }}
            customization={custormization}
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
