'use client'

import { useState } from 'react'
import { Form } from './Form'
import { List } from './List'

export function AddressElement ({ currentProduct, setToggleComponentContainer }: any) {
  const [toggleComponenet, setToggleComponent] = useState<string>('Form')
  return (
    <>
      {toggleComponenet === 'Form' ? <Form setToggleComponent={setToggleComponent} setToggleComponentContainer={setToggleComponentContainer} /> : <List setToggleComponent={setToggleComponent} setToggleComponentContainer={setToggleComponentContainer} />}
    </>
  )
}
