'use client'
import { AddressElement, useElements } from '@stripe/react-stripe-js'
import { useUser } from '@/context'
import { useSupabase } from '@/app/Providers'
import { useUserPayment } from '@/store'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

export function AddressEdit ({ item, isOpen, onOpenChange }: any) {
  const elements = useElements()
  const { supabase } = useSupabase()
  const { userId } = useUser()
  const { setStore } = useUserPayment()
  const { id, value: { name, phone, address: { line1, city, state, country, postal_code: postalCode } } } = item

  const handleSubmit = async (onClose: any) => {
    const address = await elements?.getElement(AddressElement)?.getValue() as any

    if (address.complete) {
      supabase.from('adresses').update({ user_id: userId, address: JSON.stringify(address) }).eq('id', id).then(() => {
        supabase.from('adresses').select('*').order('id').then(({ data }) => {
          setStore('addressList', data?.map(({ address, id: _id }: any) => ({ ...JSON.parse(address), id: _id })))
        }).then(() => onClose())
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Editar direccion</ModalHeader>
            <ModalBody>
              <AddressElement
                className='p-4'
                options={{
                  mode: 'shipping',
                  allowedCountries: ['CO'],
                  autocomplete: {
                    mode: 'automatic'
                  },
                  fields: {
                    phone: 'always'
                  },
                  validation: {
                    phone: {
                      required: 'always'
                    }
                  },
                  defaultValues: {
                    name,
                    phone: phone.slice(3),
                    address: {
                      country,
                      city,
                      line1,
                      state,
                      postal_code: postalCode
                    }
                  }
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>Cancelar</Button>
              <Button color='primary' onPress={() => handleSubmit(onClose)}>Guardar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
