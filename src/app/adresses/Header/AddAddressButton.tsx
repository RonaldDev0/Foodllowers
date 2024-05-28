'use client'
import { AddressForm } from '../AddressForm'
import { useDisclosure } from '@nextui-org/react'

export function AddAddressButton () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <AddressForm
      HeadLabel='Dirección de envío'
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    />
  )
}
