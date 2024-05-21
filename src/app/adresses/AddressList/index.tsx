/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useEffect } from 'react'
import { useSupabase } from '@/app/Providers'
import { useUser } from '@/store'
import { CardAddress } from './CardAddress'
import { useDecrypt } from '@/hooks'

export function AddressList () {
  const { supabase } = useSupabase()
  const { addressList, userId, setStore } = useUser()

  useEffect(() => {
    if (!userId) return

    if (!addressList) {
      try {
        supabase
          .from('addresses')
          .select('id, user, number, numberPrefix, aditionalInfo, formatted_address, geometry')
          .then(({ data, error }) => {
            if (error) {
              return
            }
            useDecrypt({
              key: userId,
              data,
              ignore: ['id']
            }).then(res => {
              setStore('addressList', res)
              setStore('addressSelect', res[0])
            })
          })
      } catch (e) {
        console.log(e)
      }
    }
  }, [userId])

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
