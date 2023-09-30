'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { Card, CardBody } from '@nextui-org/react'

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
    <Link href={path}>
      <Card>
        <CardBody className='p-0'>
          <Image src={preview} width='350' height='200' alt='img preview' className='w-[350px] h-[200px]' />
          <div className='px-4 pb-2 pt-2 flex justify-between'>
            <p className='text-xl'>{fullName}</p>
            <p>⭐{qualification}</p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

function InfluencerList () {
  const { influencerList } = useContent()

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {influencerList?.map((influencer: any) => <InfluencerCard key={influencer.id} influencer={influencer} />)}
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
    <div className='flex flex-col w-full mb-16 items-center gap-12'>
      <SearchBarr message />
      <InfluencerList />
    </div>
  )
}
