import { Card, CardBody } from '@nextui-org/react'

export function Alert () {
  return (
    <Card>
      <CardBody className='grid place-content-center'>
        <p className='text-xl'>Este restaurante esta cerrado!!</p>
      </CardBody>
    </Card>
  )
}
