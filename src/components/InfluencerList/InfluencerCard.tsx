import Link from 'next/link'
import { Avatar } from '@nextui-org/react'
import type { IInfluencer } from '@/store'

export function InfluencerCard ({ influencer }: { influencer: IInfluencer }) {
  const { path, avatar } = influencer
  return (
    <Link href={path}>
      <Avatar
        size='lg'
        className='w-20 h-20'
        src={avatar}
      />
    </Link>
  )
}
