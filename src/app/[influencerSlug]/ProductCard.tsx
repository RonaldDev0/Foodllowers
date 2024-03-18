import { Card, CardBody, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

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

const serviceFee = 2000
const influencer = 2000

export function ProductCard ({ product }: { product: IProductCard }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Link href={product?.state ? `/checkout?q=${product.id}` : '#'}>
        <Card>
          <CardBody
            className='p-0 cursor-pointer'
            onClick={() => !product?.state && onOpen()}
          >
            <Image
              src={product.preview}
              width='200'
              height='200'
              alt='preview'
              className='w-[350px] h-[200px]'
            />
            {!product?.state && (
              <Chip color='warning' className='dark:text-white opacity-90 absolute m-2'>
                Agotado
              </Chip>
            )}
            <div className='p-3 flex justify-between items-center'>
              <div>
                <p className='text-xl'>
                  {product.name}
                </p>
                {/* <p className='opacity-60'>
                  {product.description}
                </p> */}
              </div>
              <p className='font-bold text-green-600'>
                ${(product.price + serviceFee + influencer).toLocaleString()}
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
