'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { SearchBarr } from '@/components'
import { useContent } from '@/context'

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

function InfluencerCard ({ influencer }: { influencer: IInfluencer }) {
  const { qualification, full_name: fullName, path, preview } = influencer

  return (
    <Link href={path} className='bg-bg_card hover:bg-bg_card_hover transition-all rounded-lg p-3'>
      <Image src={preview} width='200' height='200' alt='img preview' className='w-[350px] h-[200px] rounded-lg' />
      <p className='text-xl'>{fullName}</p>
      <p>⭐{qualification}</p>
    </Link>
  )
}

function InfluencerList () {
  const { searchFilter: influencerList } = useContent()

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {
        influencerList && influencerList.map((influencer: any) => <InfluencerCard key={influencer.id} influencer={influencer} />)
      }
    </div>
  )
}

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 200)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col w-full h-screen items-center  bg-bg gap-12'>
      <SearchBarr />
      <InfluencerList />
    </div>
  )
}
