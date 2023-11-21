import { create } from 'zustand'

type IInfluencer = {
  id: number
  qualification: number
  full_name: string
  document_number: string
  gender: string
  preview: string
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
