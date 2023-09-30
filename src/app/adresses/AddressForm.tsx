'use client'
import { AddressElement, useElements } from '@stripe/react-stripe-js'
import { useUser } from '@/context'
import { useSupabase } from '@/app/Providers'
import { useUserPayment } from '@/store'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

export function AddressForm ({ isOpen, onOpenChange }: any) {
  const elements = useElements()
  const { supabase } = useSupabase()
  const { user, userId } = useUser()
  const { setStore } = useUserPayment()

  const handleSubmit = async (onClose: any) => {
    const address = await elements?.getElement(AddressElement)?.getValue() as any

    if (address.complete) {
      supabase.from('adresses').insert({ user_id: userId, address: JSON.stringify(address) })
        .then(() => {
          supabase.from('adresses').select('*').order('id').then(({ data }) => {
            setStore('addressList', data?.map(({ address, id: _id }: any) => ({ ...JSON.parse(address), id: _id })))
          }).then(onClose())
        })
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Agregar direccion</ModalHeader>
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
                    name: user.full_name,
                    address: {
                      country: 'CO',
                      city: 'Bogotá'
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
