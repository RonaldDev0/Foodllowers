import { create } from 'zustand'

type State = {
  influencerList: any
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useContent = create<State & Actions>(set => ({
  influencerList: null,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
