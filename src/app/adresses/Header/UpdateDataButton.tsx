/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useSupabase } from '../../Providers'
import { useUser } from '@/store'
import { indexedDB } from '@/indexedDB'
import { Button } from '@nextui-org/react'
import { useDecrypt } from '@/hooks'

export function UpdateDataButton () {
  const { supabase } = useSupabase()
  const { userId, setStore } = useUser()

  const updateIndexedDB = () => {
    indexedDB.shipmentList.clear().then(() => {
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
    })
  }

  return (
    <Button
      onClick={updateIndexedDB}
      color='primary'
      className='w-full'
    >
      Sincronizar con tu celular
    </Button>
  )
}
