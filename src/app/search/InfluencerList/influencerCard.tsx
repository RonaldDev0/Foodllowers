'use client'
import { Card, CardBody, Button } from '@nextui-org/react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function InfluencerCard ({ item }: { item: any }) {
  const [follow, setFollow] = useState<boolean>(false)

  return (
    <Link href={item.full_name}>
      <Card className='border border-white border-opacity-10'>
        <CardBody className='p-2'>
          <div className='grid grid-cols-3 gap-4 items-center'>
            <Image
              alt='img'
              src={item.avatar}
              width='250'
              height='250'
              className='w-[150px] h-[150px] [@media(max-width:800px)]:h-[120px] rounded-full row-span-2'
            />
            <p>{item.full_name}</p>
            <Link href='#' className='pt-4'>
              <Button
                color={follow ? 'primary' : 'secondary'}
                onPress={() => setFollow(!follow)}
              >
                {follow ? 'dejar de seguir' : 'seguir'}
              </Button>
            </Link>
            <p className='opacity-60 w-72 [@media(max-width:800px)]:w-60 h-14 text-small col-span-2 overflow-hidden'>
              {item.description}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
