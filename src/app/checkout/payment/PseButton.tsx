/* eslint-disable camelcase */
'use client'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { useState } from 'react'
import { useSupabase } from '@/app/Providers'

const pseIsDisabled = false

interface IProps {
  preferences: any[]
  shippingCost: number
  tip: number
  influencer: number
  numberOfProducts: number
  serviceFee: number
  haveCoupon: boolean
  coupon: string
  amount: number
  product: any
  isMaximumOrders: boolean
  isMaximumNumberOfPurchases: boolean
  haveDelivery: boolean
  isMaxDistance: boolean
  type: any
  number: string
  pseError: any
  setPseError: Function
  financial_institution: number | null
  mercadopagoComision: number
}

export function PseButton ({
  preferences,
  shippingCost,
  tip,
  influencer,
  numberOfProducts,
  serviceFee,
  haveCoupon,
  coupon,
  amount,
  product,
  isMaximumOrders,
  isMaximumNumberOfPurchases,
  haveDelivery,
  isMaxDistance,
  type,
  number,
  pseError,
  setPseError,
  financial_institution,
  mercadopagoComision
}: IProps) {
  const { addressSelect, userId, user, darkMode } = useUser()
  const router = useRouter()
  const { supabase } = useSupabase()

  const [alert, setAlert] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const showAlert = (message: string, route = null as string | null) => {
    setIsLoading(false)
    setAlert(message)
    onOpen()
    setTimeout(() => {
      if (route === '/') router.push(route)
      else if (route === '/currentshipment') router.push(route)
      else if (route === 'refresh') router.refresh()
    }, 3000)
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    if (!addressSelect) {
      showAlert('Debes agregar una dirección')
      return
    } else if (financial_institution === null) {
      showAlert('Debes seleccionar una entidad bancaria')
      return
    } else if (type !== 'CC' && type !== 'CE' && type !== 'TI') {
      setPseError({ ...pseError, type: 'Debes seleccionar un tipo de documento' })
      showAlert('Debes seleccionar un tipo de documento')
      return
    } else if (number.length < 6) {
      setPseError({ ...pseError, number: 'Número de documento inválido' })
      showAlert('Número de documento inválido')
      return
    } else if (!haveDelivery || isMaxDistance) {
      showAlert('Actualmente no tenemos deliverys en tu zona')
      return
    } else if (isMaximumOrders) {
      showAlert('La cocina está procesando el máximo de pedidos posibles. Regresa más tarde.')
      return
    } else if (isMaximumNumberOfPurchases) {
      showAlert('No quedan más productos disponibles')
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
        if (data[0].payment_status === 'pending...') {
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

    fetch('/api/process_pse_payment', {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        preferences,
        product,
        shippingCost,
        tip,
        influencer,
        userId,
        user,
        addressSelect,
        numberOfProducts,
        serviceFee,
        haveCoupon,
        coupon,
        mercadopagoComision,
        paymentInfo: {
          transaction_amount: amount,
          callback_url: 'https://foodllowers.vercel.app/currentshipment',
          description: `Foodllowers: ${product.name} - ${product.influencers.full_name}`,
          additional_info: { ip_address: ip },
          payment_method_id: 'pse',
          transaction_details: { financial_institution },
          payer: {
            email: user.email,
            entity_type: 'individual',
            identification: { type, number }
          }
        }
      })
    })
      .then(res => res.json())
      .then(({ external_resource_url, error }) => {
        setIsLoading(false)
        if (error) {
          showAlert(error)
          setTimeout(() => router.refresh(), 5000)
          return
        }
        router.push(external_resource_url)
      })
  }

  return (
    <>
      <div className='flex flex-col w-full gap-4'>
        {pseIsDisabled && <p className='text-center'>PSE no está disponible en este momento</p>}
        <Button
          onPress={handleSubmit}
          isDisabled={isLoading || pseIsDisabled}
          color={darkMode ? 'secondary' : 'warning'}
          className={`
            w-full
            text-lg font-semibold ${isLoading ? 'opacity-60' : ''}
          `}
        >
          {isLoading ? 'Comprando...' : 'Comprar'}
        </Button>
      </div>
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
