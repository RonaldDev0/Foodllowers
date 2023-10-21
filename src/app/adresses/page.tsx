'use client'
import { CardAddress } from './CardAddress'
import { AddressForm } from './AddressForm'
import { useEffect } from 'react'
import { useSupabase } from '../Providers'
import { useUser } from '@/store'
import { useDisclosure } from '@nextui-org/react'

export default function Adresses () {
  const { supabase } = useSupabase()
  const { addressList, setStore } = useUser()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    !addressList && (
      supabase
        .from('adresses')
        .select('id, address')
        .then(({ data }) => {
          setStore('addressList', data?.map(({ address, id }: any) => ({ ...JSON.parse(address), id })))
        })
    )
  }, [])

  return (
    <div className='w-full h-screen flex flex-col top-12 justify-center items-center gap-8'>
      {
        addressList?.map((item: any) => (
          <CardAddress key={item.id} item={item} />
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
