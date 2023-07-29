'use client'
import Card from './Card'
import { useUser } from '@/store'

export type ICard = {
  id: any
  name: string
  lastName: string
  number: string
  expiration: any
  cvv: string
}

export default function ListCards () {
  const { cards }: { cards: ICard[] } = useUser()

  if (cards === undefined) {
    return null
  }

  return (
    <div className='overflow-y-auto h-[600px] mt-10'>
      {
        cards.map(({ id, name, lastName, number, expiration, cvv }) => (
          <Card
            key={id}
            id={id}
            name={name}
            lastName={lastName}
            number={number}
            expiration={expiration}
            cvv={cvv}
          />
        ))
      }
    </div>
  )
}
