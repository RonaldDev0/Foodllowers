import { Card, CardBody } from '@nextui-org/react'

export function EstimationTime ({ time }: { time: number }) {
  return (
    <Card className='border border-white border-opacity-10'>
      <CardBody>
        <div className='flex justify-between items-center'>
          <p>tiempo estimado:</p>
          <p>{time} minutos</p>
        </div>
      </CardBody>
    </Card>
  )
}
