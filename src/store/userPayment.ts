import { create } from 'zustand'

type Address = {
  id: string,
  name: string,
  line1: string
}

type Card = {
  id: string,
  number: string,
  cvv: string,
  expiration: string
}

type State = {
  buyModal: boolean,
  phone: string | null,
  addressList: Address[],
  cardList: Card[]
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useUserPayment = create<State & Actions>(set => ({
  buyModal: false,
  phone: null,
  addressList: [],
  cardList: [],
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
