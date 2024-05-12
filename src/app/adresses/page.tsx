'use client'
import { AddressList } from './AddressList'
import { AddressForm } from './AddressForm'
import { useDisclosure } from '@nextui-org/react'

export default function Adresses () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className='w-full h-screen flex flex-col top-12 justify-center items-center gap-8'>
      <AddressList />
      <AddressForm
        HeadLabel='Dirección de envío'
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}
