import { create } from 'zustand'

export type IInfluencer = {
  banner: string
  avatar: string
  id: number
  full_name: string
  bank: string
  path: string
}

type State = {
  influencerList: IInfluencer[] | null
  productList: any
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useContent = create<State & Actions>(set => ({
  influencerList: null,
  productList: null,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
