import { Card, CardHeader, CardBody } from '@nextui-org/react'
import Image from 'next/image'

export const revalidate = 7 * 24 * 60 * 60

export default function Home () {
  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <Image
        src='/img/LogName-light.png'
        alt='Foodllowers'
        width='450'
        height='450'
        className='fixed dark:hidden
        [@media(max-width:800px)]:top-32
        [@media(max-width:1400px)]:top-28
        [@media(min-width:1500px)]:top-60'
      />
      <Image
        src='/img/LogName.png'
        alt='Foodllowers'
        width='450'
        height='450'
        className='fixed hidden dark:block
        [@media(max-width:800px)]:top-32
        [@media(max-width:1400px)]:top-28
        [@media(min-width:1500px)]:top-60'
      />
      <Card className='w-96 [@media(max-width:365px)]:!w-80'>
        <CardHeader className='flex justify-center text-2xl gap-2'>
          Error
        </CardHeader>
        <CardBody>
          Lo sentimos,<br /> pero hemos alcanzado el número máximo de usuarios conectados en este momento.<br /><br /> Te invitamos a intentar nuevamente más tarde.<br /><br /> Agradecemos tu comprensión mientras trabajamos para mejorar el servicio.
        </CardBody>
      </Card>
    </main>
  )
}
