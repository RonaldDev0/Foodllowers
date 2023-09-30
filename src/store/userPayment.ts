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
  id: number,
  user_id: string,
  product: {
    id: number,
    id_kitchen: number,
    id_influencer: number,
    category: string,
    preview: string,
    name: string,
    description: string,
    price: string
  }
}

type State = {
  phone: string | null,
  addressSelect: Address | null,
  addressList: Address[],
  cardSelect: any,
  cardList: Card[],
  shipmentList: Shipment[]
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
  filter: (property: keyof State, value: any) => void
}

export const useUserPayment = create<State & Actions>(set => ({
  phone: null,
  addressSelect: null,
  addressList: [],
  cardSelect: null,
  cardList: [],
  shipmentList: [],
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value })),
  filter: (property, value) => set(() => ({ [property]: value }))
}))
