/* eslint-disable camelcase */
import Link from 'next/link'
import { Avatar } from '@nextui-org/react'
import type { IInfluencer } from '@/store'

export function InfluencerCard ({ influencer }: { influencer: IInfluencer }) {
  const { full_name, avatar } = influencer
  return (
    <Link href={'/' + full_name}>
      <Avatar
        size='lg'
        className='w-20 h-20'
        src={avatar}
      />
    </Link>
  )
}
