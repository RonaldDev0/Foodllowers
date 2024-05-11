'use client'
import { ProductCard } from './ProductCard'
import { useSupabase } from '../../app/Providers'
import { useContent } from '@/store'
import { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'

export function ProductList () {
  const { supabase } = useSupabase()
  const { productList, setStore } = useContent()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (!productList) {
      supabase
        .from('products')
        .select('id, preview, name, price, state, influencers( avatar, full_name, path, bank_account ), kitchens( address, bank_account )')
        .then(({ data, error }) => {
          if (error) {
            return
          }

          const products = data.filter((item: any) =>
            item.kitchens.address !== null &&
            item.kitchens.bank_account !== null &&
            item.influencers.bank_account !== null
          )

          setStore('productList', products)
        })
    }
  }, [])

  return (
    <>
      <div className='flex flex-wrap gap-5 justify-center max-w-7xl'>
        {productList?.map((product: any) => (
          <ProductCard
            onOpen={onOpen}
            product={product}
            key={product.id}
          />
        ))}
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
