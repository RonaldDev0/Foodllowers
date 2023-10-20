'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'

export function AddressForm () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button color='primary' onPress={onOpen}>Agregar direccion</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Agregar direccion</ModalHeader>
              <ModalBody>
                <h1>AdressForm</h1>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>Cancelar</Button>
                <Button color='primary' onPress={onClose}>Guardar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
