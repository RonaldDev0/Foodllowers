'use client'
import { useEffect } from 'react'
import { useSupabase } from '@/app/Providers'
import { useUser } from '@/store'
import { CardAddress } from './CardAddress'

export function AddressList () {
  const { supabase } = useSupabase()
  const { addressList, setStore } = useUser()

  useEffect(() => {
    if (!addressList) {
      supabase
        .from('addresses')
        .select('id, user, number, numberPrefix, aditionalInfo, formatted_address, geometry')
        .then(({ data, error }) => {
          if (error) {
            return
          }
          setStore('addressList', data)
        })
    }
  }, [])

  return (
    <>
      {
        addressList?.map(address => (
          <CardAddress
            key={address.id}
            address={address}
          />
        ))
      }
    </>
  )
}
