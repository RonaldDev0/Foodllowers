import Link from 'next/link'
import { Card, CardBody } from '@nextui-org/react'

export function EmptyCard () {
  return (
    <Card>
      <CardBody className='p-6 w-96'>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <p>No tienes ningun pedido en camino.</p>
          <Link href='/' className='dark:text-purple-800 text-yellow-400'>Explorar productos</Link>
        </div>
      </CardBody>
    </Card>
  )
}
