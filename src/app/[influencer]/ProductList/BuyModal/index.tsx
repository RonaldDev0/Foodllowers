'use client'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { Address } from './Address'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductInfo } from './ProductInfo'
import { CardForm } from './Card'
import { CardElement, useElements, useStripe, AddressElement } from '@stripe/react-stripe-js'
import { useUserPayment } from '@/store'
import { useSupabase } from '@/app/Providers'
import { useUser } from '@/context'
import { AnimatePresence, motion } from 'framer-motion'

export function BuyModal ({ isOpen, onOpenChange, product }: any) {
  const [activeStep, setActiveStep] = useState(0)
  const router = useRouter()
  const { addressList, setStore, addressSelect } = useUserPayment()
  const elements = useElements()
  const stripe = useStripe()
  const { addressSelect: address } = useUserPayment()
  const { supabase } = useSupabase()
  const { userId } = useUser()
  const [button, setButton] = useState<string>('Comprar')
  const [error, setError] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState<boolean>(false)

  const steps = [
    { component: <ProductInfo product={product} /> },
    { component: <Address /> },
    { component: <CardForm setCardComplete={setCardComplete} error={error} /> }
  ]

  const handleSubmit = async (onClose: Function) => {
    if (address?.complete && cardComplete && button !== 'Loading...') {
      setButton('Loading...')
      const clientSecret = await fetch(process.env.NEXT_PUBLIC_STRIPE_FETCH_PATH!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
      }).then(res => res.json())

      const { error, paymentIntent }: any = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
          billing_details: address.value
        }
      })

      if (!error && paymentIntent.status === 'succeeded') {
        supabase.from('orders').insert({ user_id: userId, kitchen_id: product.id_kitchen, product, order_state: true, user_address: address?.value }).then(() => {
          setError(null)
          onClose()
          router.push('/')
        })
      } else {
        setButton('Try again')
        setError(error?.message)
      }
    }
  }

  const handleSubmitAdress = async () => {
    const address = await elements?.getElement(AddressElement)?.getValue() as any
    if (address?.complete) {
      supabase.from('adresses').insert({ user_id: userId, address: JSON.stringify(address) }).then(() => {
        setStore('addressList', [...addressList, address])
        setStore('addressSelect', address)
      })
    }
    if (address?.complete || addressSelect) {
      setError(null)
      setActiveStep(activeStep + 1)
    } else setError('Ingresa una direccion para continuar')
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent className='py-5 overflow-hidden'>
        {onClose => (
          <>
            <ModalHeader className='flex justify-center'>
              <div className='w-72 flex justify-around'>
                {steps.map((_, index) => (
                  <div key={index} className='flex items-center'>
                    <div className={` w-12 h-12 flex justify-center items-center transition-all rounded-full
                      ${activeStep >= index ? 'bg-blue-800' : 'bg-blue-950'}
                      ${activeStep === index ? 'text-white' : 'text-gray-500'}
                    `}
                    >
                      {activeStep > index
                        ? (
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                          </svg>
                          )
                        : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 flex-grow h-1 transition-all ${activeStep > index ? 'bg-blue-800' : 'bg-blue-950'}`} />
                    )}
                  </div>
                ))}
              </div>
            </ModalHeader>
            <ModalBody>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {steps[activeStep].component}
                </motion.div>
              </AnimatePresence>
            </ModalBody>
            <ModalFooter className='flex justify-around'>
              {activeStep > 0 && <Button onPress={() => setActiveStep(activeStep - 1)}>Anterior</Button>}
              {activeStep === 0 && <Button color='primary' onPress={() => setActiveStep(activeStep + 1)}>Siguiente</Button>}
              {activeStep === 1 && <Button color='primary' onPress={handleSubmitAdress}>Siguiente</Button>}
              {activeStep === 2 && <Button color='primary' disabled={button === 'Loading...'} onPress={() => handleSubmit(onClose)}>{button}</Button>}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
