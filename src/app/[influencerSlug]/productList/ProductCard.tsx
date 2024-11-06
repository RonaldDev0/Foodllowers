'use client'
import { Card, CardBody, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useContent } from '@/store'
import { useComission } from '@/hooks'

export type IProductCard = {
  id: number
  id_influencer: number
  id_kitchen: number
  category: string
  price: number
  preview: string
  name: string
  description: string
  state: boolean
}

export function ProductCard ({ product }: { product: IProductCard }) {
  const { serviceFee, influencer } = useContent()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Link href={product?.state ? `/checkout?q=${product.id}` : '#'}>
        <Card className='border border-white border-opacity-10 w-96 [@media(max-width:365px)]:!w-80'>
          <CardBody
            className='p-0 flex flex-row'
            onClick={() => !product?.state && onOpen()}
          >
            <Image
              src={product.preview}
              width='800'
              height='800'
              alt='preview'
              className='w-[160px] h-[150px]'
            />
            {!product?.state && (
              <Chip color='warning' className='dark:text-white opacity-90 absolute m-2'>
                Agotado
              </Chip>
            )}
            <div className='p-3 flex flex-col justify-around items-center w-full'>
              <div>
                <p className='text-xl'>
                  {product.name}
                </p>
                {/* <p className='opacity-60'>
                  {product.description}
                </p> */}
              </div>
              <p className='opacity-80'>
                {
                  (product.price + serviceFee + influencer + useComission(product.price + serviceFee + influencer)).toLocaleString('es-Es', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                    useGrouping: true
                  })
                }
              </p>
            </div>
          </CardBody>
        </Card>
      </Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <p>Producto Agotado</p>
              </ModalHeader>
              <ModalBody>
                <p>Este producto se encuentra agotado temporalmente, puedes revisar mas tarde o el dia siguiente</p>
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
