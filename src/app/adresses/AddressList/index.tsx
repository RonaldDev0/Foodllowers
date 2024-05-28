/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useEffect } from 'react'
import { useSupabase } from '@/app/Providers'
import { useUser } from '@/store'
import { CardAddress } from './CardAddress'
import { useDecrypt } from '@/hooks'
import { indexedDB } from '@/indexedDB'
import { useLiveQuery } from 'dexie-react-hooks'

export function AddressList () {
  const { supabase } = useSupabase()
  const { addressList, userId, setStore } = useUser()
  const addressListQuery = useLiveQuery(() => {
    const result: any = indexedDB.addresses.toArray()
    if (result.length === 1) {
      return [result[0]]
    }
    return result
  })

  useEffect(() => {
    if (!userId || !addressListQuery || addressList) return

    if (addressListQuery.length > 0) {
      useDecrypt({ key: userId, data: addressListQuery, ignore: ['id'] })
        .then(res => {
          setStore('addressList', res)
          setStore('addressSelect', res[0])
        })
      return
    }

    supabase
      .from('addresses')
      .select('id, user, number, numberPrefix, aditionalInfo, formatted_address, geometry')
      .then(({ data, error }) => {
        if (error) return

        data.map(address => (
          indexedDB.addresses.add(address)
        ))

        useDecrypt({ key: userId, data, ignore: ['id'] })
          .then(res => {
            setStore('addressList', res)
            setStore('addressSelect', res[0])
          })
      })
  }, [userId, addressListQuery])

  if (!addressList) return null

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
