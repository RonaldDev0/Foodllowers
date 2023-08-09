'use client'

import { useState } from 'react'
import { Form } from './Form'
import { List } from './List'

export function CardElement ({ currentProduct }: any) {
  const [toggleComponenet, setToggleComponent] = useState<string>('Form')
  return (
    <>
      {toggleComponenet === 'Form' ? <Form currentProduct={currentProduct} setToggleComponent={setToggleComponent} /> : <List />}
    </>
  )
}
