import { useUserPayment } from '@/store'
import { List } from './List'
import { Form } from './Form'

export function CardElement () {
  const { cardList } = useUserPayment()
  return (
    <>
      {cardList.length === 0 ? <Form /> : <List />}
    </>
  )
}
