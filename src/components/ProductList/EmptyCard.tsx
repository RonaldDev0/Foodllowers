import { Card, CardBody, Skeleton } from '@nextui-org/react'

export function EmptyCard () {
  return (
    <Card className='border border-white border-opacity-10'>
      <CardBody className='p-0'>
        <Skeleton className='w-[350px] h-[280px]' />
        <div className='p-4 flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
            <Skeleton className='rounded-full w-10 h-10' />
            <div>
              <Skeleton className='rounded-lg w-32 h-6' />
              <Skeleton className='rounded-lg w-32 h-6' />
            </div>
          </div>
          <Skeleton className='rounded-lg w-24 h-6' />
        </div>
      </CardBody>
    </Card>
  )
}
