'use client'
import { EmptyCard } from './EmptyCard'
import { ProductCard } from './ProductCard'
import { useContent } from '@/store'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'

export function ProductList () {
  const { productList } = useContent()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className='flex flex-wrap gap-3 justify-center max-w-7xl'>
        {productList?.length
          ? productList.map((product: any) => (
            <ProductCard
              onOpen={onOpen}
              product={product}
              key={product.id}
            />
          ))
          : Array(3).fill(0).map((_, i) => <EmptyCard key={i} />)}
      </div>
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
