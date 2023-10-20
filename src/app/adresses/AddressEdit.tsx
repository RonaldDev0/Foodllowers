'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

export function AddressEdit ({ item, isOpen, onOpenChange }: any) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Editar direccion</ModalHeader>
            <ModalBody>
              <p>{JSON.stringify(item, null, 2)}</p>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>Cancelar</Button>
              <Button color='primary' onPress={onClose}>Guardar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
