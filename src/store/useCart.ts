import { create } from 'zustand'

type State = {
  Product: any
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useCart = create<State & Actions>(set => ({
  Product: null,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
