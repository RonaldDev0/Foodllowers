/* eslint-disable camelcase */
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useSupabase } from '@/app/Providers'

type props = {
  amount: number
  error: Boolean
  product: any
  shippingCost: number
  tip: number
  influencer: number
  isMaximumOrders: boolean
  isMaximumNumberOfPurchases: boolean
  paymentInfo: any
}

export function PaymentButton ({ amount, error, product, shippingCost, tip, influencer, isMaximumOrders, isMaximumNumberOfPurchases, paymentInfo }: props) {
  const { supabase } = useSupabase()
  const { addressSelect, userId, user } = useUser()
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [alert, setAlert] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const showAlert = (message: string, route = null as string | null) => {
    setAlert(message)
    onOpen()
    setIsLoading(false)
    if (route === '/') router.push(route)
    else if (route === '/currentshipment') router.push(route)
    else if (route === 'refresh') router.refresh()
  }

  const onSubmit = async () => {
    setIsLoading(true)
    if (isMaximumOrders) {
      showAlert('La cocina está procesando el máximo de pedidos posibles. Regresa más tarde.')
      return
    } else if (isMaximumNumberOfPurchases) {
      showAlert('No quedan más productos disponibles')
      return
    } else if (error) {
      showAlert('Error al procesar la transacción', 'refresh')
      return
    } else if (!product.state) {
      showAlert('Este producto se encuentra agotado.', '/')
      return
    } else if (!product?.kitchens.open) {
      showAlert('Esta cocina esta cerrada!!', '/')
      return
    } else if (!product?.kitchens.address) {
      showAlert('Este restaurante aun no esta listo para entregar domicilios', '/')
      return
    }

    const order = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', userId)
      .then(({ data }: any) => data)

    if (order.length) {
      showAlert('ya tienes un pedido en camino!, no puedes hacer mas de un pedido al mismo tiempo')
      return
    }

    const { ip }: any = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())

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
          ...paymentInfo,
          transaction_amount: amount,
          callback_url: 'https://foodllowers.vercel.app/currentshipment',
          description: `Foodllowers: ${product.name} - ${product.influencers.full_name}`,
          additional_info: { ip_address: ip }
        }
      })
    })
      .then(res => res.json())
      .then(({ error }) => {
        if (error) {
          setIsLoading(false)
          router.refresh()
          return
        }
        router.push('/currentshipment')
        setIsLoading(false)
      })
  }

  return (
    <>
      <Button
        onClick={onSubmit}
        disabled={isLoading}
        color='secondary'
        className={`text-lg font-semibold ${isLoading ? 'opacity-60' : ''}`}
      >
        {isLoading ? 'Comprando...' : 'Comprar'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
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
                  onPress={() => router.push('/currentshipment')}
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
