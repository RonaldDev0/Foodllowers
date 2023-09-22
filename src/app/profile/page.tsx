'use client'
import Image from 'next/image'
import { useUser } from '@/context'
import { Card, CardBody } from '@nextui-org/react'

export default function Profile () {
  const { user } = useUser()
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card className='rounded-none'>
        <CardBody className='p-0'>
          <div className='rounded-xl flex [@media(max-width:800px)]:flex-col items-center justify-center gap-44 [@media(min-width:800px)]:p-20 [@media(max-width:800px)]:flex [@media(max-width:800px)]:justify-center [@media(max-width:800px)]:w-screen [@media(max-width:800px)]:h-screen'>
            <Image src={user?.avatar_url} alt='avatar' width={300} height={300} className='rounded-full h-[300px]' />
            <div>
              <span>Nombre</span>
              <h1 className='text-xl'>{user?.full_name}</h1>
              <span>Correo</span>
              <p className='text-xl'>{user?.email}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
