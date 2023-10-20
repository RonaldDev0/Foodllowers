import { create } from 'zustand'

type State = {
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useUser = create<State & Actions>(set => ({
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
