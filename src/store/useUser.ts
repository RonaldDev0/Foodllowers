import { create } from 'zustand'

type Address = {
  id: number,
  complete: boolean,
  isNewAddress: boolean,
  value: {
    name: string,
    phone: string,
    address: {
      city: string,
      country: string,
      line1: string,
      line2: string,
      postal_code: string,
      state: string
    }
  }
}

type Card = {
  number: string,
  cvv: string,
  expiration: string
}

type Shipment = {
  id: string
  user_id: string
  product: {
    id: string
    influencerId: string
    kitchenId: string
    productId: string
    productName: string
    preview: string
    description: string
    name: string
    price: number
  }
}
type State = {
  user: any,
  userId: any,
  phone: string | null,
  addressSelect: Address | null,
  addressList: Address[]| null,
  cardSelect: any,
  cardList: Card[],
  shipmentList: Shipment[]| null,
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useUser = create<State & Actions>(set => ({
  user: null,
  userId: null,
  phone: null,
  addressSelect: null,
  addressList: null,
  cardSelect: null,
  cardList: [],
  shipmentList: null,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
