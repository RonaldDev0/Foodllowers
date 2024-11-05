import { Skeleton, Card, CardBody } from '@nextui-org/react'

export function EmptyCard () {
  return (
    <Card className='border border-white border-opacity-10 w-96 [@media(max-width:365px)]:!w-80'>
      <CardBody className='p-0 flex flex-row'>
        <Skeleton className='w-[160px] h-[140px]' />
        <div className='p-4 flex flex-col justify-around items-center'>
          <Skeleton className='rounded-lg w-32 h-6' />
          <div className='flex gap-3 items-center'>
            <Skeleton className='rounded-full w-10 h-10' />
            <div>
              <Skeleton className='rounded-lg w-32 h-6' />
              <Skeleton className='rounded-lg w-32 h-6' />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
