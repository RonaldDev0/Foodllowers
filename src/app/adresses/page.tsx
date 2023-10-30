'use client'
import { CardAddress } from './CardAddress'
import { AddressForm } from './AddressForm'
import { useEffect } from 'react'
import { useSupabase } from '../Providers'
import { useUser } from '@/store'
import { useDisclosure } from '@nextui-org/react'

export type IAddress = {
  [key: string]: any
  id: string,
  user: string,
  number: string,
  numberPrefix: string,
  country: string,
  city: string,
  localidad: string,
  address: {
    streetType: string
    value1: string,
    value2: string,
    value3?: string
  },
  aditionalInfo?: string,
  complete: string
}

export default function Adresses () {
  const { supabase } = useSupabase()
  const { addressList, setStore } = useUser()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (!addressList) {
      supabase
        .from('addresses')
        .select('id, user, number, numberPrefix, country, city, localidad, address, aditionalInfo, complete')
        .then(({ data }) => setStore('addressList', data))
    }
  }, [])

  return (
    <div className='w-full h-screen flex flex-col top-12 justify-center items-center gap-8'>
      {
        addressList?.map((address: IAddress) => (
          <CardAddress key={address.id} address={address} />
        ))
      }
      <AddressForm
        HeadLabel='Dirección de envío'
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}
