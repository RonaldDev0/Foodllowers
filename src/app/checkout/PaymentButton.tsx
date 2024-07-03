/* eslint-disable camelcase */
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useSupabase } from '@/app/Providers'
import { z } from 'zod'

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
  setPaymentError: Function
}

const paymentInfoSchema = z.object({
  card_number: z.string()
    .length(19, 'El número de tarjeta es invalido'),
  expiration_date: z.string()
    .length(5, 'La fecha de expiración es invalida'),
  cvv: z.string()
    .min(3, 'CVV debe tener almenos 3 dígitos')
    .max(4, 'CVV debe tener 3 o 4 dígitos')
})

export function PaymentButton ({ amount, error, product, shippingCost, tip, influencer, isMaximumOrders, isMaximumNumberOfPurchases, paymentInfo, setPaymentError }: props) {
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

  function validatePaymentInfo () {
    const result = paymentInfoSchema.safeParse(paymentInfo)

    if (result.success) {
      setPaymentError({ card_number: false, expiration_date: false, cvv: false })
      return { errorMessages: {} }
    } else {
      const errorMessages: Record<string, string> = {}

      result.error.errors.forEach(error => {
        if (error.path && error.path.length > 0) {
          errorMessages[error.path[0] as string] = error.message
        }
      })

      setPaymentError(errorMessages)
      return errorMessages
    }
  }

  const onSubmit = async () => {
    setIsLoading(true)
    const errorMessages: any = validatePaymentInfo()

    if (errorMessages.card_number) {
      showAlert('La tarjeta no es válida')
      return
    } else if (errorMessages.expiration_date) {
      showAlert('La fecha de expiración no es válida')
      return
    } else if (errorMessages.cvv) {
      showAlert('El CVV no es válido')
    } else if (isMaximumOrders) {
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
          // ...paymentInfo,
          transaction_amount: amount,
          callback_url: 'https://foodllowers.vercel.app/currentshipment',
          description: `Foodllowers: ${product.name} - ${product.influencers.full_name}`,
          additional_info: { ip_address: ip },
          payment_method_id: 'debvisa',
          payer: {
            email: user.email
          }
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
        className={`
          text-lg font-semibold ${isLoading ? 'opacity-60' : ''}
          [@media(max-width:800px)]:fixed
          [@media(max-width:800px)]:z-40
          [@media(max-width:800px)]:bottom-5
          [@media(max-width:800px)]:w-96
        `}
      >
        {isLoading ? 'Comprando...' : 'Comprar'}
      </Button>
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
                <Button color='secondary' onPress={onClose}>
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
