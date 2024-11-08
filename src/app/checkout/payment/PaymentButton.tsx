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
  preferences: any[]
  haveDelivery: boolean
  numberOfProducts: number
  serviceFee: number
  haveCoupon: boolean
  coupon: string
  isMaxDistance: boolean
  isDisabled: boolean
  pickUpInStore: boolean
}

const paymentInfoSchema = z.object({
  card_number: z.string()
    .length(19, 'El número de tarjeta es invalido'),
  expiration_date: z.string()
    .length(7, 'La fecha de expiración es invalida'),
  cvv: z.string()
    .min(3, 'CVV debe tener almenos 3 dígitos')
    .max(4, 'CVV debe tener 3 o 4 dígitos'),
  card_holder: z.string()
    .min(3, 'Ingresa un nombre valido')
})

export function PaymentButton ({
  amount,
  error,
  product,
  shippingCost,
  tip,
  influencer,
  isMaximumOrders,
  isMaximumNumberOfPurchases,
  paymentInfo,
  setPaymentError,
  preferences,
  haveDelivery,
  numberOfProducts,
  serviceFee,
  haveCoupon,
  coupon,
  isMaxDistance,
  isDisabled,
  pickUpInStore
}: props) {
  const { supabase } = useSupabase()
  const { addressSelect, userId, user, darkMode } = useUser()
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [alert, setAlert] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const showAlert = (message: string, route = null as string | null) => {
    setAlert(message)
    onOpen()
    setIsLoading(false)
    setTimeout(() => {
      if (route === '/') router.push(route)
      else if (route === '/currentshipment') router.push(route)
      else if (route === 'refresh') router.refresh()
    }, 3000)
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

    if (!addressSelect && !pickUpInStore) {
      showAlert('Debes agregar una dirección')
      return
    }

    const errorMessages: any = validatePaymentInfo()

    if ((!haveDelivery || isMaxDistance) && !pickUpInStore) {
      showAlert('Actualmente no tenemos deliverys en tu zona')
      return
    } else if (errorMessages.card_number) {
      showAlert('La tarjeta no es válida')
      return
    } else if (errorMessages.expiration_date) {
      showAlert('La fecha de expiración no es válida')
      return
    } else if (errorMessages.cvv) {
      showAlert('El CVV no es válido')
    } else if (errorMessages.card_holder) {
      showAlert('El nombre del titular de la tarjeta no es válido')
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
      .select('id, payment_status')
      .eq('user_id', userId)
      .then(({ data }: any) => {
        if (data.length && data[0].payment_status === 'pending...') {
          supabase
            .from('orders')
            .delete()
            .eq('user_id', userId)
            .eq('id', data[0].id)
            .then(() => console.log('.'))
          return []
        }
        return data
      })

    if (order.length) {
      showAlert('ya tienes un pedido en camino!, no puedes hacer mas de un pedido al mismo tiempo')
      return
    }

    const { ip }: any = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())

    fetch('/api/payment/process', {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        preferences,
        product,
        shippingCost,
        tip: Math.floor(tip),
        influencer,
        userId,
        user,
        addressSelect,
        numberOfProducts,
        serviceFee,
        haveCoupon,
        coupon,
        pickUpInStore,
        influencer_id: product.influencers.id,
        paymentInfo: {
          transaction_amount: amount,
          description: `Foodllowers: ${product.name} - ${product.influencers.full_name}`,
          additional_info: { ip_address: ip },
          payer: { email: user.email }
        },
        card: paymentInfo
      })
    })
      .then(res => res.json())
      .then(({ error }) => {
        if (error) {
          setIsLoading(false)
          showAlert(error)
          setTimeout(() => router.refresh(), 5000)
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
        isDisabled={isLoading || isDisabled}
        color={darkMode ? 'secondary' : 'warning'}
        className={`
          w-full
          text-lg font-semibold ${isLoading ? 'opacity-60' : ''}
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
                <Button color={darkMode ? 'secondary' : 'warning'} onPress={onClose}>
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
