'use client'
import { useEffect } from 'react'
import { useSupabase } from '../Providers'
import { useUser } from '@/store'
import Image from 'next/image'
import { Card, CardBody, Avatar } from '@nextui-org/react'

export default function Shipments () {
  const { supabase } = useSupabase()
  const { userId, shipmentList, setStore } = useUser()

  useEffect(() => {
    if (userId && !shipmentList) {
      supabase
        .from('shipments')
        .select('*')
        .then(res => {
          res.data && (
            setStore('shipmentList', res.data)
          )
        })
    }
  }, [userId])

  return (
    <div className='w-full h-screen flex flex-col top-12 justify-around items-center'>
      <div className='flex flex-col gap-4'>
        {
          shipmentList?.map(({ id, product: { name, price, preview, influencers: { preview: IPreview, full_name: fullName } } }) => (
            <Card key={id}>
              <CardBody className='p-0'>
                <div className='flex items-center gap-5 rounded-lg cursor-pointer'>
                  <Image
                    src={preview}
                    alt={name}
                    width={150}
                    height={200}
                    className='h-[150px] w-[200px]'
                  />
                  <div className='mr-5 flex flex-col gap-2'>
                    <p className='text-lg'>
                      {name}
                    </p>
                    <div className='flex gap-2 justify-center items-center'>
                      <Avatar src={IPreview} />
                      <p className='opacity-50'>{fullName}</p>
                    </div>
                    <p className='text-green-600'>
                      {price.toLocaleString()}
                    </p>
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
