'use client'

import { useState, useEffect } from 'react'
import { Form } from './Form'
import { List } from './List'
import { useUserPayment } from '@/store'
import { useUser } from '@/context'

export function AddressElement ({ setToggleComponentContainer }: any) {
  const { addresses } = useUser()
  const { addressList, setStore } = useUserPayment()
  const [toggleComponenet, setToggleComponent] = useState<string>('Form')

  useEffect(() => {
    setStore('addressList', addresses.map(({ address }: any) => JSON.parse(address)))
    if (addressList.length > 0) {
      setToggleComponent('List')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressList.length])
  return (
    <>
      {toggleComponenet === 'Form' ? <Form setToggleComponent={setToggleComponent} setToggleComponentContainer={setToggleComponentContainer} /> : <List setToggleComponent={setToggleComponent} setToggleComponentContainer={setToggleComponentContainer} />}
    </>
  )
}
