'use client'
import Image from 'next/image'
import { useUser } from '@/store'
import { Card, CardBody, Button } from '@nextui-org/react'
import { useSupabase } from '@/app/Providers'

export const revalidate = 7 * 24 * 60 * 60

export default function Profile () {
  const { user, setStore } = useUser()
  const { supabase } = useSupabase()

  const handleSignOut = () => {
    supabase.auth.signOut()
      .then(() => {
        setStore('user', null)
        setStore('userId', null)
      })
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card className='rounded-xl border border-white border-opacity-10'>
        <CardBody className='p-0'>
          <div className='flex [@media(max-width:800px)]:flex-col items-center justify-center gap-44 [@media(min-width:800px)]:p-14 [@media(max-width:800px)]:flex [@media(max-width:800px)]:justify-center [@media(max-width:800px)]:w-screen [@media(max-width:800px)]:h-screen'>
            <Image
              src={user?.avatar_url}
              alt='avatar'
              width={300}
              height={300}
              className='rounded-full h-[300px]'
            />
            <div>
              <span className='opacity-50'>
                Nombre
              </span>
              <h2 className='text-xl'>
                {user?.full_name}
              </h2>
              <span className='opacity-50'>
                Correo
              </span>
              <p className='text-xl'>
                {user?.email}
              </p>
              <Button
                color='danger'
                className='mt-10'
                onClick={handleSignOut}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
