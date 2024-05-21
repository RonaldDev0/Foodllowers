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
  description: string
  error: Boolean
  product: any
  kitchenOpen: boolean
  kitchenAddress: object
  shippingCost: number
  tip: number
  influencer: number
  calculateMercadoPagoComission: Function
}

export function PaymentForm ({
  amount,
  description,
  error,
  product,
  kitchenOpen,
  kitchenAddress,
  shippingCost,
  tip,
  influencer,
  calculateMercadoPagoComission
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

    if (!kitchenAddress) {
      setAlert('Este restaurante aun no esta listo para entregar domicilios')
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
      .then(({ id, status, fee_details, transaction_amount, external_resource_url }) => {
        if (external_resource_url) {
          supabase
            .from('orders')
            .insert([{
              user_id: userId,
              user_name: user.name,
              product,
              order_state: 'buscando cocina...',
              kitchen_id: product.id_kitchen,
              influencer_id: product.influencers.id,
              user_address: addressSelect,
              kitchen_address: product.kitchens.address,
              invoice_id: id,
              user_email: user.email,
              payment_status: 'pending',
              transaction_amount: {
                mercadopago: calculateMercadoPagoComission(amount),
                influencer,
                kitchen: product.price,
                delivery: {
                  service: shippingCost,
                  tip
                },
                earnings: transaction_amount - calculateMercadoPagoComission(amount) - product.price - shippingCost - tip - influencer,
                total: transaction_amount
              }
            }])
            .select('id')
            .then(({ error }) => {
              if (error) {
                return
              }
              router.push(external_resource_url)
            })
          return
        }
        if (status === 'approved') {
          supabase
            .from('orders')
            .insert([{
              user_id: userId,
              user_name: user.name,
              product,
              order_state: 'buscando cocina...',
              kitchen_id: product.id_kitchen,
              influencer_id: product.influencers.id,
              user_address: addressSelect,
              kitchen_address: product.kitchens.address,
              invoice_id: id,
              user_email: user.email,
              payment_status: 'approved',
              transaction_amount: {
                mercadopago: Math.floor(fee_details[0].amount),
                influencer,
                kitchen: product.price,
                delivery: {
                  service: shippingCost,
                  tip
                },
                earnings: transaction_amount - Math.floor(fee_details[0].amount) - product.price - shippingCost - tip - influencer,
                total: transaction_amount
              }
            }])
            .select('id')
            .then(({ error }) => {
              if (error) {
                return
              }
              router.push('/currentshipment')
            })
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
