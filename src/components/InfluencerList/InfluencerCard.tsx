'use client'

import Link from 'next/link'
import Image from 'next/image'

type IInfluencer = {
  id: number
  qualification: number
  full_name: string
  document_number: string
  gender: string
  preview: string
  bank: string
  path: string
}

export function InfluencerCard ({ influencer }: { influencer: IInfluencer }) {
  const { qualification, full_name: fullName, path } = influencer

  return (
    <Link href={path} className='bg-bg_card hover:bg-bg_card_hover transition-all rounded-lg p-3'>
      <Image src='./img/pato404.svg' width='200' height='200' alt='img preview' />
      <p className='text-xl'>{fullName}</p>
      <p>⭐{qualification}</p>
    </Link>
  )
}
