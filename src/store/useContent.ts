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
  currentInfluencer: any
  currentProduct: any
  preparationTime: number
  pricePerKm: number
  minima: number
  serviceFee: number
  influencer: number
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

// note: get prices from supabase

export const useContent = create<State & Actions>(set => ({
  influencerList: null,
  productList: null,
  currentInfluencer: null,
  currentProduct: null,
  preparationTime: 20,
  pricePerKm: 1000,
  minima: 3000,
  serviceFee: 2000,
  influencer: 1000,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
