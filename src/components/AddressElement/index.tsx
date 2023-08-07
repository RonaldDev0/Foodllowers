import { List } from './List'
import { Form } from './Form'

export function AddressElement () {
  const AddressList = []
  return (
    <>
      {AddressList.length === 0 ? <Form /> : <List />}
    </>
  )
}
