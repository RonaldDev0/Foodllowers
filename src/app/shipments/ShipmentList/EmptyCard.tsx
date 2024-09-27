import { Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'

export function EmptyCard () {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card>
        <CardBody className='flex justify-center items-center'>
          <p>No haz hecho ninguna compra</p>
          <Link className='dark:text-purple-800 text-yellow-400 font-semibold' href='/'>
            Compra aqui
          </Link>
        </CardBody>
      </Card>
    </div>
  )
}
