'use client'

import { useState, useEffect } from 'react'
import { Form } from './Form'
import { List } from './List'
import { useUserPayment } from '@/store'

export function AddressElement ({ setToggleComponentContainer }: any) {
  const { addressList } = useUserPayment()
  const [toggleComponenet, setToggleComponent] = useState<string>('Form')

  useEffect(() => {
    if (addressList.length > 0) {
      setToggleComponent('List')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {toggleComponenet === 'Form' ? <Form setToggleComponent={setToggleComponent} setToggleComponentContainer={setToggleComponentContainer} /> : <List setToggleComponent={setToggleComponent} setToggleComponentContainer={setToggleComponentContainer} />}
    </>
  )
}
