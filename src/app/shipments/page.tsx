'use client'
import { useEffect } from 'react'
import { useSupabase } from '../Providers'
import { useUser } from '@/store'
import Image from 'next/image'
import { Card, CardBody } from '@nextui-org/react'

export default function Shipments () {
  const { supabase } = useSupabase()
  const { userId, shipmentList, setStore } = useUser()

  useEffect(() => {
    if (userId && !shipmentList) {
      supabase
        .from('shipments')
        .select('*')
        .then(res => res.data && setStore('shipmentList', res.data))
    }
  }, [userId])

  return (
    <div className='w-full h-screen flex flex-col top-12 justify-around items-center'>
      <div className='flex flex-col gap-4'>
        {
          shipmentList?.map(({ id, product: { name, description, price } }) => (
            <Card key={id}>
              <CardBody className='p-0'>
                <div className='flex items-center gap-5 rounded-lg p-3 cursor-pointer'>
                  <Image src='./img/pato404.svg' alt={name} width={150} height={200} className='h-[100px]' />
                  <div className='mr-5'>
                    <p className='text-lg font-bold'>{name}</p>
                    <p>{description}</p>
                    <p className='text-green-600'>{price.toLocaleString()}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        }
      </div>
    </div>
  )
}
