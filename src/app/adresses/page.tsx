'use client'
import { useUserPayment } from '@/store'
import { CardAddress } from './CardAddress'

export default function Adresses () {
  const { addressList } = useUserPayment()
  return (
    <div className='w-full h-screen flex flex-col top-12 justify-center items-center gap-8'>
      {addressList.map((item) => <CardAddress key={item.id} item={item} />)}
      <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl'>Agregar direccion</button>
    </div>
  )
}
