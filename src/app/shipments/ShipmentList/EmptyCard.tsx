import { Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'

export function EmptyCard () {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card>
        <CardBody>
          <p>No haz hecho ninguna compra</p>
          <Link className='text-purple-800 font-semibold' href='/'>
            Compra aqui
          </Link>
        </CardBody>
      </Card>
    </div>
  )
}
