import { create } from 'zustand'

type Address = {
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
  id: string,
  number: string,
  cvv: string,
  expiration: string
}

type State = {
  buyModal: boolean,
  phone: string | null,
  addressSelect: Address | null,
  addressList: Address[],
  cardList: Card[]
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useUserPayment = create<State & Actions>(set => ({
  buyModal: false,
  phone: null,
  addressSelect: null,
  addressList: [],
  cardList: [],
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
