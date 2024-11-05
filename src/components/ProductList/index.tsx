'use client'
import { EmptyCard } from './EmptyCard'
import { ProductCard } from './ProductCard'
import { useContent } from '@/store'
import { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'

export function ProductList () {
  const { productList, influencer, serviceFee, setStore } = useContent()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (influencer === 0 || serviceFee === 0 || productList?.length) return

    fetch('/api/content/products', {
      method: 'POST',
      body: JSON.stringify({ influencer, serviceFee })
    })
      .then(res => res.json())
      .then(data => setStore('productList', data))
  }, [influencer, serviceFee])

  return (
    <>
      <div className='flex flex-wrap gap-5 justify-center max-w-7xl'>
        {productList?.length
          ? productList.map((product: any) => (
            <ProductCard
              onOpen={onOpen}
              product={product}
              key={product.id}
            />
          ))
          : <EmptyCard />}
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
