import { Card, CardBody } from '@nextui-org/react'

export function Alert ({ message }: { message: string }) {
  return (
    <Card>
      <CardBody className='grid place-content-center'>
        <p className='text-xl'>{message}</p>
      </CardBody>
    </Card>
  )
}
