'use client'
/* eslint-disable camelcase */
import { Card, CardHeader, CardBody, Avatar, Divider, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { Stepper } from './Stepper'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@/store'
import { useRouter } from 'next/navigation'
import { useSupabase } from '../Providers'

type props = {
  activeStep: string
  product: any
}

const steps = ['buscando cocina...', 'cocinando...', 'buscando delivery...', 'recogiendo...', 'entregando...', 'entregado']

export function CardData ({ activeStep, product }: props) {
  const router = useRouter()
  const { darkMode } = useUser()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { supabase } = useSupabase()

  function handleSubmit (onClose: Function) {
    const { influencers, ...rest } = product

    supabase
      .from('shipments')
      .insert({ ...rest, order_state: 'entregado' })
      .select('id')
      .then(({ data, error }) => {
        if (error) return

        supabase
          .from('orders')
          .delete()
          .eq('id', data[0].id)
          .then(() => {
            router.push('/')
            onClose()
          })
      })
  }

  if (!product) return null

  return (
    <>
      <Card className='border border-white border-opacity-10'>
        <CardHeader className='p-0'>
          <div className='flex-col'>
            <Image
              src={product.product.preview}
              width='800'
              height='800'
              alt='preview'
              className='w-96'
            />
            <div className='flex items-center p-3 gap-4'>
              <Link href={product?.influencers.full_name}>
                <Avatar src={product?.influencers.avatar} />
              </Link>
              <div className='flex flex-col'>
                <p className='font-bold'>
                  {product.product.name}
                </p>
                <p className='opacity-60'>{product?.influencers.full_name}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className='p-6 w-96'>
          {
            product.pickUpInStore
              ? (
                <div className='flex flex-col gap-4'>
                  {
                    activeStep === 'buscando delivery...'
                      ? <p>Ya puedes recoger tu pedido</p>
                      : <p>Tu pedido se esta cocinando</p>
                  }
                  <p>Codigo: {product.invoice_id.slice(-3)}</p>
                  <div className='flex gap-2'>
                    <p>Dirección: </p>
                    <Link
                      href={`https://maps.google.com/?q=${product?.kitchen_address?.formatted_address}`}
                      className='text-purple-800'
                      target='_blank'
                    >
                      {product.kitchen_address.formatted_address}
                    </Link>
                  </div>
                  {
                    activeStep === 'buscando delivery...' && (
                      <Button
                        color={darkMode ? 'secondary' : 'warning'}
                        className='w-full font-semibold text-lg'
                        onClick={onOpen}
                      >
                        Tengo mi pedido
                      </Button>
                    )
                  }
                </div>
                )
              : <Stepper activeStep={steps.indexOf(activeStep)} steps={steps} />
          }
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex justify-center'>
                Confirmación
              </ModalHeader>
              <Divider />
              <ModalBody>
                <p>Estás seguro de que ya recibiste tu pedido?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color={darkMode ? 'secondary' : 'warning'}
                  className='w-full font-semibold text-lg'
                  onClick={() => handleSubmit(onClose)}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
