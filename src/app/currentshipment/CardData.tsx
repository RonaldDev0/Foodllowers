import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'
import { Stepper } from './Stepper'
import Image from 'next/image'

type props = {
  steps: string[]
  activeStep: string
  product: any
}

export function CardData ({ steps, activeStep, product }: props) {
  return (
    <Card>
      <CardHeader>
        <Image src='./img/pato404.svg' width='200' height='350' alt='product image' />
        <p>{product.name}</p>
      </CardHeader>
      <Divider />
      <CardBody className='p-6 w-96'>
        <Stepper activeStep={steps.indexOf(activeStep)} steps={steps} />
      </CardBody>
    </Card>
  )
}
