/* eslint-disable camelcase */
import Link from 'next/link'
import { Avatar, Skeleton } from '@nextui-org/react'
import type { IInfluencer } from '@/store'

export function InfluencerCard ({ influencer }: { influencer: IInfluencer }) {
  const { full_name, avatar } = influencer
  return (
    <Skeleton isLoaded={!!full_name && !!avatar} className='rounded-full w-20 h-20'>
      <Link href={'/' + full_name}>
        <Avatar
          size='lg'
          className='w-20 h-20 border border-white border-opacity-10'
          src={avatar}
        />
      </Link>
    </Skeleton>
  )
}
