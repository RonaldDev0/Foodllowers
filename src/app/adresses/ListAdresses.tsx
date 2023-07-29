'use client'
import AdressCard from './AdressCard'
import { useUser } from '@/store'

type IAdress = {
  id: any
  name: string
  address: string
}

export default function ListAdresses () {
  const { adresses }: { adresses: IAdress[] } = useUser()

  if (adresses === undefined) {
    return null
  }

  return (
    <div className='overflow-y-auto h-[600px] mt-10'>
      {
        adresses.map(({ id, name, address }) => <AdressCard key={id} id={id} name={name} address={address} />)
      }
    </div>
  )
}
