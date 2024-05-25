import { create } from 'zustand'

export type IAddress = {
  id: string
  user: string
  number: string
  numberPrefix: string
  country: string
  city: string
  localidad: string
  address: {
    streetType: string
    value1: string
    value2: string
    value3?: string
  },
  aditionalInfo?: string
  complete: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
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
    influencers: {
      avatar: string
      full_name: string
    }
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
  addressSelect: IAddress | null,
  addressList: IAddress[]| null,
  cardSelect: any,
  cardList: Card[],
  shipmentList: Shipment[]| null,
  darkMode: boolean
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useUser = create<State & Actions>(set => ({
  darkMode: JSON.parse(localStorage.getItem('darkMode') || 'true'),
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
