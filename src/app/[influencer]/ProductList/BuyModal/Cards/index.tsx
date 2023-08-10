'use client'

import { useState } from 'react'
import { Form } from './Form'
import { List } from './List'
// import { useUserPayment } from '@/store'
// import { useUser } from '@/context'

export function CardElement ({ currentProduct }: any) {
  // const { cardList, setStore } = useUserPayment()
  // const { cards } = useUser()

  const [toggleComponenet, setToggleComponent] = useState<string>('Form')

  // useEffect(() => {
  //   setStore('cardList', cards.map(({ card }: any) => JSON.parse(card)))
  //   if (cardList.length > 0) {
  //     setToggleComponent('List')
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cardList.length])
  return (
    <>
      {toggleComponenet === 'Form' ? <Form currentProduct={currentProduct} setToggleComponent={setToggleComponent} /> : <List setToggleComponent={setToggleComponent} currentProduct={currentProduct} />}
    </>
  )
}
