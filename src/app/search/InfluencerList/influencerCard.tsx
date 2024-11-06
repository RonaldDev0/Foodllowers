'use client'
import { Card, CardBody, Button } from '@nextui-org/react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function InfluencerCard ({ item }: { item: any }) {
  const [follow, setFollow] = useState<boolean>(false)

  return (
    <Link href={item.full_name}>
      <Card className='border border-white border-opacity-10 w-96 [@media(max-width:365px)]:!w-80'>
        <CardBody className='p-2'>
          <div className='gap-4 flex items-center'>
            <Image
              alt='img'
              src={item.avatar}
              width='250'
              height='250'
              className='w-[120px] h-[120px] rounded-full row-span-2'
            />
            <div className='w-full flex flex-col gap-7 justify-around'>
              <p>{item.full_name}</p>
              <Button
                color={follow ? 'default' : 'secondary'}
                onPress={() => setFollow(!follow)}
                variant={follow ? 'faded' : 'solid'}
              >
                {follow ? 'siguiendo' : 'seguir'}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
