import { Card, CardBody } from '@nextui-org/react'

export function EstimationTime ({ time }: { time: number }) {
  return (
    <Card>
      <CardBody>
        <div className='flex justify-between items-center'>
          <p>tiempo estimado:</p>
          <p>{time} minutos</p>
        </div>
      </CardBody>
    </Card>
  )
}
