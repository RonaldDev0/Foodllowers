import { Card, CardBody } from '@nextui-org/react'

export function Alert ({ message }: { message: string }) {
  return (
    <Card className='border border-white border-opacity-10'>
      <CardBody className='grid place-content-center'>
        <p className='text-xl'>{message}</p>
      </CardBody>
    </Card>
  )
}
