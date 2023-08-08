'use client'

import { useUserPayment } from '@/store'
import { List } from './List'
import { Form } from './Form'

export function AddressElement () {
  const { addressList } = useUserPayment()
  return (
    <>
      {addressList.length === 0 ? <Form /> : <List />}
    </>
  )
}
